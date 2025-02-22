export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface DataContextType {
  users: User[];
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchProducts: () => Promise<void>;
} 