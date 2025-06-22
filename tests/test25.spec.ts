import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
    console.log('USERNAME:', process.env.HTTP_CREDENTIALS_USERNAME);
    console.log('PASSWORD:', process.env.HTTP_CREDENTIALS_PASSWORD);
    console.log(`Env.variable: ${process.env.BASE_URL}`)
    //await page.goto('');
})