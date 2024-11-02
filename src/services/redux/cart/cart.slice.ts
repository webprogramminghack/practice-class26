import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: string;
  name: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  filterThreshold: number;
};

const initialState: CartState = {
  items: [],
  filterThreshold: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<Omit<CartItem, 'name'>>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.qty = action.payload.qty;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilterThreshold: (state, action: PayloadAction<number>) => {
      state.filterThreshold = action.payload;
    },
  },
});

export const { addItem, updateItemQuantity, removeItem, setFilterThreshold } =
  cartSlice.actions;
