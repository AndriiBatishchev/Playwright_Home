import { test, expect } from '@playwright/test';
import { userList } from '../test-data/users';
import { errorList } from '../test-data/errors';
import RegPage from '../pom/pages/RegPage';
import RegForm from '../pom/forms/RegForm';

let regPage: RegPage;
let regForm: RegForm;
let email_gen: string;

test.describe('Check Registration Form ', () => {
    test.beforeEach('Open Registration Form', async ({ page }) => {
        regPage = new RegPage(page);
        regForm = new RegForm(page);
        email_gen = regForm.generateEmail();
        await regPage.open();
        await regPage.clickSignUpButton();
    });

    test.describe('Name', () => {

        test('Check "Name" field> Name required', async ({ page }) => {
            await expect(regForm.textName).toBeVisible();
            await expect(regForm.nameField).toBeVisible();
            await regForm.nameField.focus();
            await regForm.nameField.blur();
            await expect(regForm.errorName).toBeVisible();
            await expect(regForm.errorName).toHaveText(errorList.name.required);
            await regForm.checkErrorColor(regForm.nameField);
        });

        test.describe('Check "Name" field> Name is invalid', () => {
            test('number', async () => {
                await regForm.enterName('123')
                await regForm.nameField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.name.invalid);
                await regForm.checkErrorColor(regForm.nameField);
            });
            test('diacritic marks', async () => {
                await regForm.enterName('!@')
                await regForm.nameField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.name.invalid);
                await regForm.checkErrorColor(regForm.nameField);
            });
            test('Space', async () => {
                await regForm.enterName('  ')
                await regForm.nameField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.name.invalid);
                await regForm.checkErrorColor(regForm.nameField);
            });
            test('Not English', async () => {
                await regForm.enterName('тест')
                await regForm.nameField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.name.invalid);
                await regForm.checkErrorColor(regForm.nameField);
            });
        });

        test.describe('Check "Name" field> Name has to be from 2 to 20 characters long', () => {
            test('<1', async ({ }) => {
                await regForm.enterName('d')
                await regForm.nameField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.name.long);
                await regForm.checkErrorColor(regForm.nameField);
            });
            test('>20', async ({ }) => {
                await regForm.enterName('Thequickbrownfoxjumpedover')
                await regForm.nameField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.name.long);
                await regForm.checkErrorColor(regForm.nameField);
            });
        });

        test('Check "Name" field> Valid value', async ({ page }) => {
            await expect(regForm.textName).toBeVisible();
            await expect(regForm.nameField).toBeVisible();
            await regForm.nameField.fill(userList.userForRegistration.name)
            await regForm.nameField.blur();
            await expect(regForm.errorName).not.toBeVisible();
            await expect(regForm.nameField).toHaveValue(userList.userForRegistration.name);
        });
    });

    test.describe('Last Name', () => {

        test('Check "Last Name" field> Last Name required', async ({ page }) => {
            await expect(regForm.textLastName).toBeVisible();
            await expect(regForm.lastNameField).toBeVisible();
            await regForm.lastNameField.focus();
            await regForm.lastNameField.blur();
            await expect(regForm.errorName).toBeVisible();
            await expect(regForm.errorName).toHaveText(errorList.lastname.required);
            await regForm.checkErrorColor(regForm.lastNameField);
        });

        test.describe('Check "Last Name" field> Last Name is invalid', () => {
            test('number', async () => {
                await regForm.lastNameField.fill('123')
                await regForm.lastNameField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.lastname.invalid);
                await regForm.checkErrorColor(regForm.lastNameField);
            });
            test('diacritic marks', async () => {
                await regForm.lastNameField.fill('!@')
                await regForm.lastNameField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.lastname.invalid);
                await regForm.checkErrorColor(regForm.lastNameField);
            });
            test('Space', async () => {
                await regForm.lastNameField.fill('  ')
                await regForm.lastNameField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.lastname.invalid);
                await regForm.checkErrorColor(regForm.lastNameField);
            });
            test('Not English', async () => {
                await regForm.lastNameField.fill('тест')
                await regForm.lastNameField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.lastname.invalid);
                await regForm.checkErrorColor(regForm.lastNameField);
            });
        });

        test.describe('Check "Last Name" field> Last Name has to be from 2 to 20 characters long', () => {
            test('<1', async ({ }) => {
                await regForm.lastNameField.fill('d')
                await regForm.lastNameField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.lastname.long);
                await regForm.checkErrorColor(regForm.lastNameField);
            });
            test('>20', async ({ }) => {
                await regForm.lastNameField.fill('Thequickbrownfoxjumpedover')
                await regForm.lastNameField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.lastname.long);
                await regForm.checkErrorColor(regForm.lastNameField);
            });
        });

        test('Check "Last Name" field> Valid value', async ({ page }) => {
            await expect(regForm.textLastName).toBeVisible();
            await expect(regForm.lastNameField).toBeVisible();
            await regForm.lastNameField.fill(userList.userForRegistration.last_name)
            await regForm.lastNameField.blur();
            await expect(regForm.errorName).not.toBeVisible();
            await expect(regForm.lastNameField).toHaveValue(userList.userForRegistration.last_name);
        });

    });

    test.describe('Email', () => {

        test('Check "Email" field> Email required', async ({ page }) => {
            await expect(regForm.textEmail).toBeVisible();
            await expect(regForm.emailField).toBeVisible();
            await regForm.emailField.focus();
            await regForm.emailField.blur();
            await expect(regForm.errorName).toBeVisible();
            await expect(regForm.errorName).toHaveText(errorList.email.required);
            await regForm.checkErrorColor(regForm.emailField);
        });

        test.describe('Check "Email" field> Email is incorrect', () => {
            test('number', async () => {
                await regForm.emailField.fill('123456')
                await regForm.emailField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.email.invalid);
                await regForm.checkErrorColor(regForm.emailField);
            });
            test('missing username', async () => {
                await regForm.emailField.fill('@gmail.com')
                await regForm.emailField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.email.invalid);
                await regForm.checkErrorColor(regForm.emailField);
            });
            test('missing domain name after the @ symbol', async () => {
                await regForm.emailField.fill('user.name@.com')
                await regForm.emailField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.email.invalid);
                await regForm.checkErrorColor(regForm.emailField);
            });
            test('Invalid domain', async () => {
                await regForm.emailField.fill('user.name@gmail')
                await regForm.emailField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.email.invalid);
                await regForm.checkErrorColor(regForm.emailField);
            });
            test('Space', async () => {
                await regForm.emailField.fill(' ')
                await regForm.emailField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.email.invalid);
                await regForm.checkErrorColor(regForm.emailField);
            });
            test('Contains a space in the username', async () => {
                await regForm.emailField.fill('user name@gmail.com')
                await regForm.emailField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.email.invalid);
                await regForm.checkErrorColor(regForm.emailField);
            });
            test('Double dot in the domain part.', async () => {
                await regForm.emailField.fill('user.name@gmail..com')
                await regForm.emailField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.email.invalid);
                await regForm.checkErrorColor(regForm.emailField);
            });
            test('Comma instead of dot in the domain part', async () => {
                await regForm.emailField.fill('user.name@gmail,com')
                await regForm.emailField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.email.invalid);
                await regForm.checkErrorColor(regForm.emailField);
            });
            test('Domain name is too short.', async () => {
                await regForm.emailField.fill('user.name@gmail.c')
                await regForm.emailField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.email.invalid);
                await regForm.checkErrorColor(regForm.emailField);
            });
        });

        test('Check "Email" field> Valid value', async ({ page }) => {
            await expect(regForm.textEmail).toBeVisible();
            await expect(regForm.emailField).toBeVisible();
            await regForm.emailField.fill(email_gen)
            await regForm.emailField.blur();
            await expect(regForm.errorName).not.toBeVisible();
            await expect(regForm.emailField).toHaveValue(email_gen);
        });
    });

    test.describe('Password', () => {

        test('Check "Password" field> Password required', async ({ page }) => {
            await expect(regForm.textPassword).toBeVisible();
            await expect(regForm.passwordField).toBeVisible();
            await regForm.passwordField.focus();
            await regForm.passwordField.blur();
            await expect(regForm.errorName).toBeVisible();
            await expect(regForm.errorName).toHaveText(errorList.password.required);
            await regForm.checkErrorColor(regForm.passwordField);
        });

        test.describe('Check "Password" field> Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter', () => {
            test('<8 symbols', async () => {
                await regForm.passwordField.fill('12aA')
                await regForm.passwordField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.password.invalid);
                await regForm.checkErrorColor(regForm.passwordField);
            });
            test('>15 symbols', async () => {
                await regForm.passwordField.fill('12345678901234aA')
                await regForm.passwordField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.password.invalid);
                await regForm.checkErrorColor(regForm.passwordField);
            });
            test('Only number', async () => {
                await regForm.passwordField.fill('123456789')
                await regForm.passwordField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.password.invalid);
                await regForm.checkErrorColor(regForm.passwordField);
            });
            test('Without number', async () => {
                await regForm.passwordField.fill('aAaAaAaA')
                await regForm.passwordField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.password.invalid);
                await regForm.checkErrorColor(regForm.passwordField);
            });
            test('Without small', async () => {
                await regForm.passwordField.fill('1234567890A')
                await regForm.passwordField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.password.invalid);
                await regForm.checkErrorColor(regForm.passwordField);
            });
            test('Without capital', async () => {
                await regForm.passwordField.fill('1234567890a')
                await regForm.passwordField.blur();
                await expect(regForm.errorName).toBeVisible();
                await expect(regForm.errorName).toHaveText(errorList.password.invalid);
                await regForm.checkErrorColor(regForm.passwordField);
            });
        });

        test('Check "Password" field> Valid value', async ({ page }) => {
            await expect(regForm.textPassword).toBeVisible();
            await expect(regForm.passwordField).toBeVisible();
            await regForm.passwordField.fill(userList.userForRegistration.password)
            await regForm.passwordField.blur();
            await expect(regForm.errorName).not.toBeVisible();
            await expect(regForm.passwordField).toHaveValue(userList.userForRegistration.password);
        });

    });

    test.describe('Re-enter password', () => {

        test('Check "Re-enter" field> Re-enter  required', async ({ page }) => {
            await expect(regForm.textRePassword).toBeVisible();
            await expect(regForm.rePasswordField).toBeVisible();
            await regForm.rePasswordField.focus();
            await regForm.rePasswordField.blur();
            await expect(regForm.errorName).toBeVisible();
            await expect(regForm.errorName).toHaveText(errorList.re_password.required);
            await regForm.checkErrorColor(regForm.rePasswordField);
        });
        test('Check "Re-enter" field> Passwords do not match', async () => {
            await regForm.rePasswordField.fill(userList.userForRegistration.password)
            await regForm.rePasswordField.fill('1234567890aZ')
            await regForm.rePasswordField.blur();
            await expect(regForm.errorName).toHaveText(errorList.re_password.invalid);
            await regForm.checkErrorColor(regForm.rePasswordField);
        });
        test('Check "Re-enter password" field> Valid value', async ({ page }) => {
            await expect(regForm.textRePassword).toBeVisible();
            await expect(regForm.rePasswordField).toBeVisible();
            await regForm.passwordField.fill(userList.userForRegistration.password)
            await regForm.rePasswordField.fill(userList.userForRegistration.re_password)
            await regForm.rePasswordField.blur();
            await expect(regForm.errorName).not.toBeVisible();
            await expect(regForm.rePasswordField).toHaveValue(userList.userForRegistration.password);
            await expect(regForm.rePasswordField).toHaveValue(userList.userForRegistration.re_password);
        });

    });

    test.describe('Popup "Registration"', () => {

        test('Check [Close] button + disabled [Registration] button', async ({ page }) => {
            await expect(regForm.textRegistration).toBeVisible();
            await expect(regForm.modalPopUpRegistration).toBeVisible();
            await expect(regForm.nameField).toBeVisible();
            await expect(regForm.lastNameField).toBeVisible();
            await expect(regForm.emailField).toBeVisible();
            await expect(regForm.passwordField).toBeVisible();
            await expect(regForm.rePasswordField).toBeVisible();
            //Check [Close] button
            await expect(regForm.closeButton).toBeVisible();
            await expect(regForm.closeButton).not.toBeDisabled();
            //Check [Register] button
            await expect(regForm.registerButton).toBeVisible();
            await expect(regForm.registerButton).toBeDisabled();
            //Close the popup
            await (regForm.closeButton).click()
            //Check Opening popup
            await regPage.clickSignUpButton();
            await expect(regForm.textRegistration).toBeVisible();
            await expect(regForm.modalPopUpRegistration).toBeVisible();
        });

        test.describe('Check [Registration] button when fields are not filled in', () => {
            test('Without Name', async () => {
                await regForm.lastNameField.fill(userList.userForRegistration.last_name);
                await regForm.emailField.fill(userList.userForRegistration.email);
                await regForm.passwordField.fill(userList.userForRegistration.password);
                await regForm.rePasswordField.fill(userList.userForRegistration.re_password);
                await expect(regForm.registerButton).toBeDisabled();
            });
            test('Without Last Name', async () => {
                await regForm.nameField.fill(userList.userForRegistration.name);
                await regForm.emailField.fill(userList.userForRegistration.email);
                await regForm.passwordField.fill(userList.userForRegistration.password);
                await regForm.rePasswordField.fill(userList.userForRegistration.re_password);
                await expect(regForm.registerButton).toBeDisabled();
            });
            test('Without Email', async () => {
                await regForm.nameField.fill(userList.userForRegistration.name);
                await regForm.lastNameField.fill(userList.userForRegistration.last_name);
                await regForm.passwordField.fill(userList.userForRegistration.password);
                await regForm.rePasswordField.fill(userList.userForRegistration.re_password);
                await expect(regForm.registerButton).toBeDisabled();
            });
            test('Without Password', async () => {
                await regForm.nameField.fill(userList.userForRegistration.name);
                await regForm.lastNameField.fill(userList.userForRegistration.last_name);
                await regForm.emailField.fill(userList.userForRegistration.email);
                await regForm.rePasswordField.fill(userList.userForRegistration.re_password);
                await expect(regForm.registerButton).toBeDisabled();
            });
            test('Without Re-enter password', async () => {
                await regForm.nameField.fill(userList.userForRegistration.name);
                await regForm.lastNameField.fill(userList.userForRegistration.last_name);
                await regForm.emailField.fill(userList.userForRegistration.email);
                await regForm.passwordField.fill(userList.userForRegistration.password);
                await expect(regForm.registerButton).toBeDisabled();
            });
        });

        test('Check "Registration" field> Valid value', async ({ page }) => {
            await regForm.nameField.fill(userList.userForRegistration.name);
            await regForm.lastNameField.fill(userList.userForRegistration.last_name);
            await regForm.emailField.fill(email_gen);
            await regForm.passwordField.fill(userList.userForRegistration.password);
            await regForm.rePasswordField.fill(userList.userForRegistration.re_password);
            await expect(regForm.registerButton).not.toBeDisabled();
            await regForm.registerButton.click();
            await expect(regForm.textGarage).toBeVisible();
        });
    });
});
