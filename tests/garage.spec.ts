import { test, expect } from '@playwright/test';
import { userList } from '../test-data/users';
import RegPage from '../pom/pages/RegPage';
//import RegForm from '../pom/forms/RegForm';
import GaragePage from '../pom/pages/GaragePage';
import SignInForm from "../pom/forms/SignInForm";

let garagePage: GaragePage;
let signinForm: SignInForm;
let regPage: RegPage;
//let regForm: RegForm;

test.describe('Check Garage Form ', () => {
    test.beforeEach('Open Garage Form', async ({ page }) => {
        garagePage = new GaragePage(page);
        signinForm = new SignInForm(page);
        regPage = new RegPage(page);
        //regForm = new RegForm(page);


            await regPage.open();
            await signinForm.clickSignInButton();
            await signinForm.loginWithCredentials(userList.mainUser.email, userList.mainUser.password);
            await garagePage.verifyGaragePageOpen();

    });

    test.describe('Add new car', () => {

        test('Add new car', async ({ page }) => {



        });
    });
});
