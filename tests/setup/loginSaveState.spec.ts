import { test, expect } from '@playwright/test';
import { userList } from "../../test-data/users";
import RegPage from '../../pom/pages/RegPage';

import GaragePage from "../../pom/pages/GaragePage";
import SignInForm from "../../pom/forms/SignInForm";

let signinForm: SignInForm;
let garagePage: GaragePage;
let regPage: RegPage;


test.describe('Login to users and save states ', () => {
    test.beforeEach('Open site', async ({ page }) => {
        garagePage = new GaragePage(page);
        signinForm = new SignInForm(page);
        regPage = new RegPage(page);

        await regPage.open();
        await signinForm.clickSignInButton();
    });


    test('LogIn', async ({ page }) => {
        await signinForm.loginWithCredentials(userList.mainUser.email, userList.mainUser.password);
        await garagePage.verifyLogInAlertVisible();
        await garagePage.verifyGaragePageOpen();
        await page.context().storageState({ path: 'test-data/states/mainUserState.json' });

    });
});


