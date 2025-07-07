import { expect, test } from "../fixtures/userGaragePage";
import { userList } from '../test-data/users';
import RegPage from '../pom/pages/RegPage';
import GaragePage from "../pom/pages/GaragePage";
import SignInForm from "../pom/forms/SignInForm";

let signinForm: SignInForm;
let garagePage: GaragePage;
let regPage: RegPage;

test.describe('API + MOCK', () => {

    test.beforeEach('Open LogIn Form', async ({ page }) => {
        regPage = new RegPage(page);
        garagePage = new GaragePage(page);
        signinForm = new SignInForm(page);
    });

    test('Mock response', async ({ page }) => {
        await page.route('**/api/users/profile', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    status: "ok",
                    data: {
                        userId: 224971,
                        photoFilename: "default-user.png",
                        name: "Stanislav",
                        lastName: "Taran"
                    }
                }),
            });
        });

        await regPage.open();
        await signinForm.clickSignInButton();
        await signinForm.loginWithCredentials(userList.mainUser.email, userList.mainUser.password);
        await garagePage.verifyLogInAlertVisible();
        await garagePage.openProfile();
        await garagePage.verifyProfilePageOpen();
        await garagePage.verifyNameProfile();
        //await garagePage.verifyNameProfile('Stanislav Taran');
        //});
        //await page.reload();
    })

    test.describe('API tests', () => {

        test.describe('Public', () => {
            test('Get all brands[/api/cars/brands]', async ({ request }) => {
                const response = await request.get('/api/cars/brands');
                const body = await response.json();

                console.log(`Response ${JSON.stringify(response.text())}`);
                console.log('-----------------------');
                console.log(`Body ${JSON.stringify(body)}`);
                console.log('-----------------------');
                console.log(`Status ${response.status()}`);

                expect(response.status()).toBe(200);
                expect(body.data[0].title).toBe('Audi');
                expect(body.data.length).toBe(5);
            });
        })

        test.describe('Private', () => {
            let sid: string;
            let createdCarId: string;

            test.beforeAll(async ({ request }) => {
                const authRequest = await request.post('/api/auth/signin', {
                    data: {
                        "email": userList.mainUser.email,
                        "password": userList.mainUser.password,
                        "remember": false
                    }
                });

                sid = authRequest.headers()['set-cookie'].split(';')[0];
                expect(sid).not.toBeUndefined();
            })

            test('GET - Check cars in garage [/api/cars/]', async ({ request }) => {
                const response = await request.get('/api/cars/', {
                    headers: {
                        'Cookie': sid
                    }
                });
                const body = await response.json();
                expect(response.status()).toBe(200);
                //console.log(`Response: ${JSON.stringify(response)}`)
                console.log('---------')
                console.log(`Response: ${JSON.stringify(body.data)}`)
            })

            test('POST - Add new Car [/api/cars/]', async ({ request }) => {
                const newCar = {
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 123
                }
                const response = await request.post('/api/cars/', {
                    data: newCar,
                    headers: {
                        'Cookie': sid
                    }
                });
                const body = await response.json();

                expect(response.status()).toBe(201);
                expect(body.data.carBrandId).toBe(newCar.carBrandId);
                expect(body.data.carModelId).toBe(newCar.carModelId);
                expect(body.data.mileage).toBe(newCar.mileage);
                createdCarId = body.data.id;

                console.log('---------')
                console.log(`Response: ${JSON.stringify(body.data)}`)
            })

            test('GET - Check Added car in Garage [/api/cars]', async ({ request }) => {
                const response = await request.get('/api/cars/', {
                    headers: {
                        'Cookie': sid
                    }
                });
                const body = await response.json();

                expect(response.status()).toBe(200);
                const responseBody = await response.json();

                expect(Array.isArray(responseBody.data)).toBe(true);
                expect(body.data[0].carBrandId).toBe(1);
                expect(body.data[0].carModelId).toBe(1);
                expect(body.data[0].initialMileage).toBe(123);

            })

            test('DELETE - Remove created car [/api/cars/{id}]', async ({ request }) => {
                const response = await request.delete(`/api/cars/${createdCarId}`, {
                    headers: {
                        'Cookie': sid
                    }
                });

                const body = await response.json();
                expect(body.data.carId).toBe(createdCarId);
                expect(response.status()).toBe(200);

                expect(createdCarId).not.toBeUndefined();
            })

            test('GET - Check empty Garage [/api/cars]', async ({ request }) => {
                const response = await request.get('/api/cars/', {
                    headers: {
                        'Cookie': sid
                    }
                });

                expect(response.status()).toBe(200);
                const responseBody = await response.json();

                expect(Array.isArray(responseBody.data)).toBe(true);
                expect(responseBody.data.length).toBe(0);

            })

            test('POST - Add new Car with incorrect carBrandId (404) [/api/cars/]', async ({ request }) => {
                const newCar = {
                    "carBrandId": 6,
                    "carModelId": 1,
                    "mileage": 123
                }
                const response = await request.post('/api/cars/', {
                    data: newCar,
                    headers: {
                        'Cookie': sid
                    }
                });

                const response_empty = await request.get('/api/cars', {
                    headers: { 'Cookie': sid }
                });
                const body_empty = await response_empty.json();

                expect(response.status()).toBe(404);
                console.log('BODY_empty:', body_empty);
                expect(body_empty.data.length).toBe(0);
            })

            test('POST - Add new Car with incorrect mileage (400) [/api/cars/]', async ({ request }) => {
                const newCar = {
                    "carBrandId": 1,
                    "carModelId": 5,
                    "mileage": -1
                }
                const response = await request.post('/api/cars/', {
                    data: newCar,
                    headers: {
                        'Cookie': sid
                    }
                });

                const response_empty = await request.get('/api/cars', {
                    headers: { 'Cookie': sid }
                });
                const body_empty = await response_empty.json();

                expect(response.status()).toBe(400);
                console.log('BODY_empty:', body_empty);
                expect(body_empty.data.length).toBe(0);
            })

        })
    })
})
