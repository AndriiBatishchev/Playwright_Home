import { test, expect } from '@playwright/test';
import { userList } from '../test-data/users';
import { errorList } from '../test-data/errors';

test.describe('Sign in test', () => {
    let signUpButton;
    let registerButton;
    let closeButton;
    let nameField;
    let lastNameField;
    let emailField;
    let passwordField;
    let rePasswordField;

    let errorName;
    let email_gen;

    test.beforeEach('Success LogIn', async ({ page }) => {
        //const signUpbutton = page.locator('.btn-primary')
        signUpButton = page.getByRole('button', { name: 'Sign up' });
        registerButton = page.getByRole('button', { name: 'Register' });
        closeButton = page.getByRole('button', { name: 'Close' });

        nameField = page.locator('#signupName');
        lastNameField = page.locator('#signupLastName');
        emailField = page.locator('#signupEmail');
        passwordField = page.locator('#signupPassword');
        rePasswordField = page.locator('#signupRepeatPassword');

        //errorName = page.locator('.invalid-feedback', { hasText: 'Name required' });
        errorName = page.locator('.invalid-feedback');

        email_gen = `test+testovich${Date.now()}@gmail.com`

        await page.goto('');
        await signUpButton.click();
    });

    test.describe('Name', () => {

        test('Check "Name" field> Name required', async ({ page }) => {
            await expect(page.getByText('Name', { exact: true })).toBeVisible();

            await expect(nameField).toBeVisible();
            await nameField.focus();
            await nameField.blur();
            //await page.keyboard.press('Tab');
            await expect(errorName).toBeVisible();
            await expect(errorName).toHaveText(errorList.name.required);
            await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            //await page.pause();
        });

        test.describe('Check "Name" field> Name is invalid', () => {
            test('number', async () => {
                await nameField.fill('123')
                await nameField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.name.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')

            });
            test('diacritic marks', async () => {
                await nameField.fill('!@')
                await nameField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.name.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Space', async () => {
                await nameField.fill('  ')
                await nameField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.name.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Not English', async () => {
                await nameField.fill('тест')
                await nameField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.name.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
        });

        test.describe('Check "Name" field> Name has to be from 2 to 20 characters long', () => {
            test('<1', async ({ }) => {
                await nameField.fill('d')
                await nameField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.name.long);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('>20', async ({ }) => {
                await nameField.fill('Thequickbrownfoxjumpedover')
                await nameField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.name.long);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
        });

        test('Check "Name" field> Valid value', async ({ page }) => {
            await expect(page.getByText('Name', { exact: true })).toBeVisible();
            await expect(nameField).toBeVisible();
            await nameField.fill(userList.userForRegistration.name)
            await nameField.blur();
            await expect(errorName).not.toBeVisible();
            await expect(nameField).toHaveValue(userList.userForRegistration.name);
            //await page.pause();
        });
    });

    test.describe('Last Name', () => {

        test('Check "Last Name" field> Last name required', async ({ page }) => {

            await expect(page.getByText('Last name', { exact: true })).toBeVisible();

            await expect(lastNameField).toBeVisible();
            await lastNameField.focus();
            await lastNameField.blur();
            await expect(errorName).toBeVisible();
            await expect(errorName).toHaveText(errorList.lastname.required);
            await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            //await page.pause();
        });

        test.describe('Check "Last Name" field> Last Name is invalid', () => {
            test('number', async () => {
                await lastNameField.fill('123')
                await lastNameField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.lastname.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')

            });
            test('diacritic marks', async () => {
                await lastNameField.fill('!@')
                await lastNameField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.lastname.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Space', async () => {
                await lastNameField.fill('  ')
                await lastNameField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.lastname.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Not English', async () => {
                await lastNameField.fill('тест')
                await lastNameField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.lastname.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
        });

        test.describe('Check "Last Name" field> Last Name has to be from 2 to 20 characters long', () => {
            test('<1', async ({ }) => {
                await lastNameField.fill('d')
                await lastNameField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.lastname.long);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('>20', async ({ }) => {
                await lastNameField.fill('Thequickbrownfoxjumpedover')
                await lastNameField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.lastname.long);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
        });

        test('Check "Last Name" field> Valid value', async ({ page }) => {
            await expect(page.getByText('Last name', { exact: true })).toBeVisible();
            await expect(lastNameField).toBeVisible();
            await lastNameField.fill(userList.userForRegistration.last_name)
            await lastNameField.blur();
            await expect(errorName).not.toBeVisible();
            await expect(lastNameField).toHaveValue(userList.userForRegistration.last_name);
            //await page.pause();
        });

    });

    test.describe('Email', () => {

        test('Check "Email" field> Email required', async ({ page }) => {
            await expect(page.getByText('Email', { exact: true })).toBeVisible();

            await expect(emailField).toBeVisible();
            await emailField.focus();
            await emailField.blur();
            await expect(errorName).toBeVisible();
            await expect(errorName).toHaveText(errorList.email.required);
            await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')

        });

        test.describe('Check "Email" field> Email is incorrect', () => {
            test('number', async () => {
                await emailField.fill('123456')
                await emailField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.email.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('missing username', async () => {
                await emailField.fill('@gmail.com')
                await emailField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.email.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('missing domain name after the @ symbol', async () => {
                await emailField.fill('user.name@.com')
                await emailField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.email.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Invalid domain', async () => {
                await emailField.fill('user.name@gmail')
                await emailField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.email.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Space', async () => {
                await emailField.fill(' ')
                await emailField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.email.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Contains a space in the username', async () => {
                await emailField.fill('user name@gmail.com')
                await emailField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.email.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Double dot in the domain part.', async () => {
                await emailField.fill('user.name@gmail..com')
                await emailField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.email.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Comma instead of dot in the domain part', async () => {
                await emailField.fill('user.name@gmail,com')
                await emailField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.email.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Domain name is too short.', async () => {
                await emailField.fill('user.name@gmail.c')
                await emailField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.email.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
        });

        test('Check "Email" field> Valid value', async ({ page }) => {
            await expect(page.getByText('Email', { exact: true })).toBeVisible();
            await expect(emailField).toBeVisible();
            await emailField.fill(email_gen)
            await emailField.blur();
            await expect(errorName).not.toBeVisible();
            await expect(emailField).toHaveValue(email_gen);
            //await page.pause();
        });

    });

    test.describe('Password', () => {

        test('Check "Password" field> Password required', async ({ page }) => {
            await expect(page.getByText('Email', { exact: true })).toBeVisible();

            await expect(emailField).toBeVisible();
            await emailField.focus();
            await emailField.blur();
            await expect(errorName).toBeVisible();
            await expect(errorName).toHaveText(errorList.email.required);
            await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')

        });

        test.describe('Check "Password" field> Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter', () => {
            test('<8 symbols', async () => {
                await passwordField.fill('12aA')
                await passwordField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.password.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('>15 symbols', async () => {
                await passwordField.fill('12345678901234aA')
                await passwordField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.password.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Only number', async () => {
                await passwordField.fill('123456789')
                await passwordField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.password.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Without number', async () => {
                await passwordField.fill('aAaAaAaA')
                await passwordField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.password.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Without small', async () => {
                await passwordField.fill('1234567890A')
                await passwordField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.password.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
            test('Without capital', async () => {
                await passwordField.fill('1234567890a')
                await passwordField.blur();
                await expect(errorName).toBeVisible();
                await expect(errorName).toHaveText(errorList.password.invalid);
                await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            });
        });

        test('Check "Password" field> Valid value', async ({ page }) => {
            await expect(page.getByText('Email', { exact: true })).toBeVisible();
            await expect(passwordField).toBeVisible();
            await passwordField.fill(userList.userForRegistration.password)
            await passwordField.blur();
            await expect(errorName).not.toBeVisible();
            await expect(passwordField).toHaveValue(userList.userForRegistration.password);
            //await page.pause();
        });

    });

    test.describe('Re-enter password', () => {

        test('Check "Re-enter" field> Re-enter  required', async ({ page }) => {
            await expect(page.getByText('Re-enter password', { exact: true })).toBeVisible();
            await expect(rePasswordField).toBeVisible();
            await rePasswordField.focus();
            await rePasswordField.blur();
            await expect(errorName).toBeVisible();
            await expect(errorName).toHaveText(errorList.re_password.required);
            await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        });

        test('Check "Re-enter" field> Passwords do not match', async () => {
            await passwordField.fill(userList.userForRegistration.password)
            await rePasswordField.fill('1234567890aZ')
            await rePasswordField.blur();
            await expect(errorName).toHaveText(errorList.re_password.invalid);
            await expect(errorName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        });

        test('Check "Re-enter password" field> Valid value', async ({ page }) => {
            await expect(page.getByText('Re-enter password', { exact: true })).toBeVisible();
            await expect(passwordField).toBeVisible();
            await passwordField.fill(userList.userForRegistration.password)
            await rePasswordField.fill(userList.userForRegistration.re_password)
            await rePasswordField.blur();
            await expect(errorName).not.toBeVisible();
            await expect(passwordField).toHaveValue(userList.userForRegistration.password);
            await expect(rePasswordField).toHaveValue(userList.userForRegistration.re_password);
        });

    });

    test.describe('Popup "Registration"', () => {

        test('Check [Close] button + disabled [Registration] button', async ({ page }) => {
            await expect(page.locator('h4', { hasText: 'Registration' })).toBeVisible();
            await expect(page.locator('.modal-content')).toBeVisible();
            await expect(nameField).toBeVisible();
            await expect(lastNameField).toBeVisible();
            await expect(emailField).toBeVisible();
            await expect(passwordField).toBeVisible();
            await expect(rePasswordField).toBeVisible();
            //Check [Close] button
            await expect(closeButton).toBeVisible();
            await expect(closeButton).not.toBeDisabled();
            //Check [Register] button
            await expect(registerButton).toBeVisible();
            await expect(registerButton).toBeDisabled();
            //Close the popup
            await (closeButton).click()
            //Check Opening popup
            await signUpButton.click();
            await expect(page.locator('h4', { hasText: 'Registration' })).toBeVisible();
            await expect(page.locator('.modal-content')).toBeVisible();

        });

        test.describe('Check [Registration] button when fields are not filled in', () => {
            test('Without Name', async () => {
                //await nameField.fill(userList.userForRegistration.name);
                await lastNameField.fill(userList.userForRegistration.last_name);
                await emailField.fill(userList.userForRegistration.email);
                await passwordField.fill(userList.userForRegistration.password);
                await rePasswordField.fill(userList.userForRegistration.re_password);
                await expect(registerButton).toBeDisabled();
            });

            test('Without Last Name', async () => {
                await nameField.fill(userList.userForRegistration.name);
                //await lastNameField.fill(userList.userForRegistration.last_name);
                await emailField.fill(userList.userForRegistration.email);
                await passwordField.fill(userList.userForRegistration.password);
                await rePasswordField.fill(userList.userForRegistration.re_password);
                await expect(registerButton).toBeDisabled();
            });
            test('Without Email', async () => {
                await nameField.fill(userList.userForRegistration.name);
                await lastNameField.fill(userList.userForRegistration.last_name);
                //await emailField.fill(userList.userForRegistration.email);
                await passwordField.fill(userList.userForRegistration.password);
                await rePasswordField.fill(userList.userForRegistration.re_password);
                await expect(registerButton).toBeDisabled();
            });
            test('Without Password', async () => {
                await nameField.fill(userList.userForRegistration.name);
                await lastNameField.fill(userList.userForRegistration.last_name);
                await emailField.fill(userList.userForRegistration.email);
                //await passwordField.fill(userList.userForRegistration.password);
                await rePasswordField.fill(userList.userForRegistration.re_password);
                await expect(registerButton).toBeDisabled();
            });
            test('Without Re-enter password', async () => {
                await nameField.fill(userList.userForRegistration.name);
                await lastNameField.fill(userList.userForRegistration.last_name);
                await emailField.fill(userList.userForRegistration.email);
                await passwordField.fill(userList.userForRegistration.password);
                //await rePasswordField.fill(userList.userForRegistration.re_password);
                await expect(registerButton).toBeDisabled();
            });
        });

        test('Without Re-enter password', async () => {
            await nameField.fill(userList.userForRegistration.name);
            await lastNameField.fill(userList.userForRegistration.last_name);
            await emailField.fill(email_gen);
            await passwordField.fill(userList.userForRegistration.password);
            await rePasswordField.fill(userList.userForRegistration.re_password);
            await expect(registerButton).not.toBeDisabled();


        });

    });




});
