import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  addItem: (product) => {
    const items = [...get().items];
    const existingItem = items.find((item) => item.id === product.id);
    if (!existingItem) {
      items.push({ ...product, quantity: 1 });
    }
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    set({ items, total });
  },
  removeItem: (productId) => {
    const items = get().items.filter((item) => item.id !== productId);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    set({ items, total });
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    const items = get().items.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    set({ items, total });
  },
  clearCart: () => set({ items: [], total: 0 }),
}));
