import { User, Product } from '../context/types';

const API_BASE_URL = 'your-api-base-url';

export const fetchUsersData = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchProductsData = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    throw error;
  }
}; 