import { Locator, expect } from "@playwright/test";
import BasePage from "../BasePage";

//export const errorColor = 'rgb(220, 53, 69)';

export default class RegForm extends BasePage {

    public readonly nameField: Locator = this.page.locator('//input[@id="signupName"]');
    public readonly lastNameField: Locator = this.page.locator('//input[@id="signupLastName"]');
    public readonly emailField: Locator = this.page.locator('//input[@id="signupEmail"]');
    public readonly passwordField: Locator = this.page.locator('//input[@id="signupPassword"]');
    public readonly rePasswordField: Locator = this.page.locator('//input[@id="signupRepeatPassword"]');

    public readonly textName: Locator = this.page.getByText('Name', { exact: true });
    public readonly textLastName: Locator = this.page.getByText('Last name', { exact: true });
    public readonly textEmail: Locator = this.page.getByText('Email', { exact: true });
    public readonly textPassword: Locator = this.page.getByText('Password', { exact: true });
    public readonly textRePassword: Locator = this.page.getByText('Re-enter password', { exact: true });

    public readonly textRegistration: Locator = this.page.locator('h4', { hasText: 'Registration' });
    public readonly modalPopUpRegistration: Locator = this.page.locator('.modal-content');
    public readonly textGarage: Locator = this.page.locator('h1', { hasText: 'Garage' });

    public readonly closeButton: Locator = this.page.getByRole('button', { name: 'Close' });;
    public readonly registerButton: Locator = this.page.getByRole('button', { name: 'Register' });

    public readonly errorName = this.page.locator('.invalid-feedback');
    private readonly errorBorderColor = 'rgb(220, 53, 69)';

    async enterName(name: string): Promise<any> {
        await this.nameField.fill(name);
    }
    async enterLastName(lastname: string): Promise<any> {
        await this.lastNameField.fill(lastname);
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

    async clickRegisterButton(): Promise<any> {
        await this.registerButton.click();
    }


    // async checkErrorColor(locator: Locator): Promise<void> {
    //     await expect(locator).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    // }
    async checkErrorColor(locator: Locator): Promise<void> {
        await expect(locator).toHaveCSS('border-color', this.errorBorderColor);
    }
    generateEmail(): string {
        return `test+testovich${Date.now()}@gmail.com`;
    }
}
