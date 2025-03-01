import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticuloUser } from "../../models/ArticuloUser";


// Cargar el carrito desde sessionStorage
const loadCartFromSessionStorage = (): ArticuloUser[] => {
  const savedCart = sessionStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

// Guardar el carrito en sessionStorage
const saveCartToSessionStorage = (cart: ArticuloUser[]) => {
  sessionStorage.setItem("cart", JSON.stringify(cart));
};

// Estado inicial del carrito
const initialState: ArticuloUser[] = loadCartFromSessionStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action: PayloadAction<ArticuloUser>) => {
      const item = action.payload;
      const existingItem = state.find(
        (cartItem: ArticuloUser) =>
          cartItem.titulo === item.titulo &&
          cartItem.color === item.color &&
          cartItem.dimension_mm === item.dimension_mm
      );

      if (existingItem) {
        existingItem.cantidad += 1;
      } else {
        state.push(item);
      }

      saveCartToSessionStorage(state); 
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const newState = state.filter((_, idx) => idx !== index); // Eliminar por índice
  
      saveCartToSessionStorage(newState); // Guardar en sessionStorage
      return newState;
  }
  ,
  
    updateCantidad: (state, action: PayloadAction<{ index: number, cantidad: number }>) => {
      const { index, cantidad } = action.payload;
      if (state[index]) {
          state[index].cantidad = Math.max(1, cantidad); // Evita cantidades menores a 1
          saveCartToSessionStorage(state); // Guardar en sessionStorage
      }
    },

    clearCart: () => {
      saveCartToSessionStorage([]); // Vaciar sessionStorage
      return [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart, updateCantidad } = cartSlice.actions;

// reducer sirve para manipular el estado, si quiero acceder a atributos del estado, tengo que hacerlo a través de un selector
export const cartSize = (state: { cart: ArticuloUser[]; }) => state.cart.length;

