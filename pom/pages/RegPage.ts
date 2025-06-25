import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage";


export default class RegPage extends BasePage {
    private readonly signUpButton: Locator = this.page.locator('//button[contains(@class,"hero-descriptor_btn btn btn-primary")]');;

    // constructor(page: Page){
    // this.page = page;
    // this.signUpButton = page.locator('//button[contains(@class,"btn-primary")]');
    // }

    async open(): Promise<any> {
        await this.page.goto('');
    }

    async clickSignUpButton(): Promise<any> {
        await this.signUpButton.click();
    }





}