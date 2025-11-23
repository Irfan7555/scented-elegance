import { Perfume } from './data';

const API_URL = 'http://localhost:8000';

export interface Category {
    id: string;
    name: string;
    description: string;
    slug: string;
}

export const api = {
    getProducts: async (category?: string, featured?: boolean): Promise<Perfume[]> => {
        const params = new URLSearchParams();
        if (category && category !== 'all') params.append('category', category);
        if (featured) params.append('featured', 'true');

        const response = await fetch(`${API_URL}/products?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        return data.map((item: any) => ({
            ...item,
            inStock: item.in_stock,
            in_stock: undefined
        }));
    },

    getProduct: async (id: string): Promise<Perfume> => {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        return {
            ...data,
            inStock: data.in_stock,
            in_stock: undefined
        };
    },

    getCategories: async (): Promise<Category[]> => {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
    },

    seedData: async () => {
        const response = await fetch(`${API_URL}/seed`, { method: 'POST' });
        if (!response.ok) throw new Error('Failed to seed data');
        return response.json();
    },

    createProduct: async (product: Omit<Perfume, 'id'>): Promise<Perfume> => {
        const payload = {
            ...product,
            in_stock: product.inStock,
            inStock: undefined
        };
        const response = await fetch(`${API_URL}/products/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to create product');
        const data = await response.json();
        return {
            ...data,
            inStock: data.in_stock,
            in_stock: undefined
        };
    },

    updateProduct: async (id: string, product: Partial<Perfume>): Promise<Perfume> => {
        const payload: any = { ...product };
        if (product.inStock !== undefined) {
            payload.in_stock = product.inStock;
            delete payload.inStock;
        }

        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to update product');
        const data = await response.json();
        return {
            ...data,
            inStock: data.in_stock,
            in_stock: undefined
        };
    },

    deleteProduct: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete product');
    },

    uploadImage: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Failed to upload image');
        const data = await response.json();
        return data.url;
    }
};
