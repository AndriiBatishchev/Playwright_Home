import { expect, Locator } from '@playwright/test'
import BasePage from '../BasePage';


export default class GaragePage extends BasePage {
    //Text On Garage Page
    public readonly textGarage: Locator = this.page.locator('h1', { hasText: 'Garage' });
    public readonly emptyCarInGarage: Locator = this.page.locator('h3', { hasText: 'You don’t have any cars in your garage' });

    //Alerts
    //public readonly alertLogIn: Locator = this.page.locator('//div[@class="alert alert-success"]/p["You have been successfully logged in"]');
    public readonly alertLogIn: Locator = this.page.getByText('You have been successfully logged in', { exact: true });
    public readonly alertAddedCar: Locator = this.page.getByText('Car added', { exact: true });
    public readonly alertRemovedCar: Locator = this.page.getByText('Car removed', { exact: true });
    public readonly alertUpdatedCar: Locator = this.page.getByText('Car updated', { exact: true });
    public readonly alertUpdatedMileage: Locator = this.page.getByText('Mileage updated', { exact: true });

    //Buttons on Garage Page
    //private readonly addNewCarButton: Locator = this.page.locator('//button[contains(@class, "btn-primary")]');
    private readonly addNewCarButton: Locator = this.page.getByRole('button', { name: 'Add car' });
    public readonly clickEditButton: Locator = this.page.locator('//span[contains(@class, "icon icon-edit")]');
    private readonly editMileage: Locator = this.page.locator('//input[@name="miles" and contains(@class, "ng-valid")]');
    private readonly updateMileage: Locator = this.page.getByRole('button', { name: 'Update' });

    //'Add a car' popup
    private readonly brandDropDown: Locator = this.page.locator('//select[@id="addCarBrand"]');
    private readonly modelDropDown: Locator = this.page.locator('//select[@id="addCarModel"]');
    private readonly mileageField: Locator = this.page.locator('//input[@id="addCarMileage"]');
    private readonly addButton: Locator = this.page.locator('//app-add-car-modal//button[contains(@class, "btn-primary")]');


    private readonly allAddedCarNames: Locator = this.page.locator('//p[contains(@class,"car_name")]');

    //'Edit a car' popup
    public readonly clickSaveButton: Locator = this.page.locator('//app-edit-car-modal//button[contains(@class, "btn btn-primary")]');
    private readonly removeCarButton: Locator = this.page.locator('//app-edit-car-modal//button[contains(@class, "btn btn-outline-danger")]');
    private readonly removeCarButtonAdditional: Locator = this.page.locator('//app-remove-car-modal//button[contains(@class, "btn btn-danger")]');



    async open(): Promise<void> {
        await this.page.goto('/panel/garage');
    }

    async verifyGaragePageOpen(): Promise<void> {
        await expect(this.textGarage).toBeVisible();
    }

    async addNewCar(brand: string, model: string, mileage: string): Promise<void> {
        await this.addNewCarButton.click();
        await this.brandDropDown.selectOption(brand);
        await this.modelDropDown.selectOption(model);
        await this.mileageField.fill(mileage);
        await this.addButton.click();
        await this.page.waitForTimeout(500);
    }

    async editNewCar(brand: string, model: string, mileage: string): Promise<void> {
        await this.clickEditButton.first().click();
        await this.brandDropDown.selectOption(brand);
        await this.modelDropDown.selectOption(model);
        await this.mileageField.fill(mileage);

        await this.clickSaveButton.click();
        await this.page.waitForTimeout(500);
    }

    async updateMileageForCar(mileage: string): Promise<void> {
        await this.editMileage.first().fill(mileage);
        await this.updateMileage.first().click();
        await expect(this.alertUpdatedMileage).toBeVisible();
        await expect(this.editMileage.first()).toHaveValue(mileage);
    }

    async verifyLastAddedCar(expectedName: string): Promise<void> {
        await expect(this.allAddedCarNames.first()).toHaveText(expectedName);
    }

    async removeCarByIndex(index: number): Promise<void> {
        const cars = this.page.locator('.car');
        const car = cars.nth(index);
        await car.locator('.icon.icon-edit').click();
        await this.removeCarButton.click();
        await this.removeCarButtonAdditional.click();
    }
    async verifyEmptyGarage(expectedName: string): Promise<void> {
        await expect(this.emptyCarInGarage).toHaveText(expectedName);
    }
    async verifyLogInAlertVisible() {
        await expect(this.alertLogIn).toBeVisible();
    }

    async verifyCarAddedAlertVisible() {
        await expect(this.alertAddedCar).toBeVisible();
    }

    async verifyCarRemovedAlertVisible() {
        await expect(this.alertRemovedCar).toBeVisible();
    }
    async verifyCarUpdatedAlertVisible() {
        await expect(this.alertUpdatedCar).toBeVisible();
    }
}

