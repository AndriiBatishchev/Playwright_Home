import { Locator, expect } from "@playwright/test";
import BasePage from "../BasePage";

export default class SignInForm extends BasePage {

    public readonly signInButton: Locator = this.page.locator('//button[contains(@class,"header_signin")]');

    public readonly emailField: Locator = this.page.locator('//input[@id="signinEmail"]');
    public readonly passwordField: Locator = this.page.locator('//input[@id="signinPassword"]');;

    public readonly textEmail: Locator = this.page.getByText('Email', { exact: true });
    public readonly textPassword: Locator = this.page.getByText('Password', { exact: true });

    public readonly textLogIn: Locator = this.page.locator('h4', { hasText: 'Log in' });
    public readonly modalPopUpLogIn: Locator = this.page.locator('.modal-content');

    public readonly closeButton: Locator = this.page.getByRole('button', { name: 'Close' });;
    public readonly loginButton: Locator = this.page.getByRole('button', { name: 'Login' });

    async clickSignInButton(): Promise<any> {
        await this.signInButton.click();
    }

    async enterEmail(email: string): Promise<any> {
        await this.emailField.fill(email);
    }
    async enterPassword(password: string): Promise<any> {
        await this.passwordField.fill(password);
    }
    async clickCloseButton(): Promise<any> {
        await this.closeButton.click();
    }

    async clickLogInButton(): Promise<any> {
        await this.loginButton.click();
    }

    async loginWithCredentials(email: string, password: string): Promise<any> {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogInButton();
    }
}

