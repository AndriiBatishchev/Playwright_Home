//import { chromium } from "@playwright/test";
import { test } from "../fixtures/userGaragePage"

test.describe('using fixtures', () => {
    test.use({storageState: 'test-data/states/mainUserState.json'});

    test.describe('QA Auto site', () => {

        test('Actions with the CAR 1', async ({ garageAsUserWithRemovingCars }) => {
            await garageAsUserWithRemovingCars.verifyGaragePageOpen();

            //Added New Car
            await garageAsUserWithRemovingCars.addNewCar('BMW', 'X5', '12');
            await garageAsUserWithRemovingCars.verifyCarAddedAlertVisible();
            await garageAsUserWithRemovingCars.verifyLastAddedCar('BMW X5');

            //Update Car
            await garageAsUserWithRemovingCars.editNewCar('Audi', 'R8', '34');
            await garageAsUserWithRemovingCars.verifyCarUpdatedAlertVisible();
            await garageAsUserWithRemovingCars.verifyLastAddedCar('Audi R8');
            await garageAsUserWithRemovingCars.updateMileageForCar('55');
        })

        test('Actions with the CAR 2', async ({ garageAsUserWithRemovingCars }) => {
            await garageAsUserWithRemovingCars.verifyGaragePageOpen();

            //Added New Car
            await garageAsUserWithRemovingCars.addNewCar('Ford', 'Fiesta', '56');
            await garageAsUserWithRemovingCars.verifyCarAddedAlertVisible();
            await garageAsUserWithRemovingCars.verifyLastAddedCar('Ford Fiesta');

            //Update Car
            await garageAsUserWithRemovingCars.editNewCar('Porsche', 'Cayenne', '78');
            await garageAsUserWithRemovingCars.verifyCarUpdatedAlertVisible();
            await garageAsUserWithRemovingCars.verifyLastAddedCar('Porsche Cayenne');
            await garageAsUserWithRemovingCars.updateMileageForCar('90');

        })
    })
})