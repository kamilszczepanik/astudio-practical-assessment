import { test, expect } from '@playwright/test'

test('Users page with buttons and table should be visible', async ({
	page,
}) => {
	await page.goto('/users')

	await expect(
		await page.getByRole('heading', { name: /users/i }),
	).toBeVisible()

	await expect(await page.getByRole('button', { name: /5/i })).toBeVisible()
	await expect(await page.getByText(/Entries/i)).toBeVisible()
	await expect(await page.getByRole('button', { name: /name/i })).toBeVisible()
	await expect(await page.getByRole('button', { name: /email/i })).toBeVisible()
	await expect(
		await page.getByRole('button', { name: /gender/i }),
	).toBeVisible()
	await expect(
		await page.getByRole('button', { name: /birth date/i }),
	).toBeVisible()

	await expect(await page.getByRole('table')).toBeVisible()
})
