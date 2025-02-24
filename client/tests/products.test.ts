import { test, expect } from '@playwright/test'

test('Products page with buttons and table should be visible', async ({ page }) => {
	await page.goto('/products')

	await expect(
		await page.getByRole('heading', { name: /products/i }),
	).toBeVisible()

	await expect(await page.getByRole('button', { name: /5/i })).toBeVisible()
	await expect(await page.getByText(/Entries/i)).toBeVisible()
	await expect(
		await page.getByRole('button', { name: /search products/i }),
	).toBeVisible()
	await expect(
		await page.getByRole('button', { name: /category/i }),
	).toBeVisible()

	await expect(await page.getByRole('table')).toBeVisible()
})
