import { test as base, Page } from "@playwright/test";
//import { test as baseTest, expect, Page } from "@playwright/test";


import { userList } from '../test-data/users';
import RegPage from '../pom/pages/RegPage';
//import RegForm from '../pom/forms/RegForm';
import GaragePage from "../pom/pages/GaragePage";
import SignInForm from "../pom/forms/SignInForm";

type PageFixtures = {
    garagePage: GaragePage,
    garageAsUserWithRemovingCars: GaragePage,

};

export const test = base.extend<PageFixtures>({
    //export const test = baseTest.extend<PageFixtures>({  
    garagePage: async ({ page }, use) => {
        let garagePage = new GaragePage(page);
        await use(garagePage);
    },

    garageAsUserWithRemovingCars: async ({ page }, use) => {
        let garagePage = new GaragePage(page);
        let signinForm = new SignInForm(page);
        let regPage = new RegPage(page);

        //Use loginSaveState.spec.ts
        // await regPage.open();
        // await signinForm.clickSignInButton();
        // await signinForm.loginWithCredentials(userList.mainUser.email, userList.mainUser.password);
        // await garagePage.verifyLogInAlertVisible();
        // await garagePage.verifyGaragePageOpen();

        await garagePage.open();
        await use(garagePage);

        await garagePage.removeCarByIndex(0);
        // await page.locator('//button[@class="btn btn-outline-danger"]').click();
        // await page.locator('//button[@class="btn btn-danger"]').click();
        await garagePage.verifyCarRemovedAlertVisible();
    },

})

export { expect } from '@playwright/test';
//export { test, expect };