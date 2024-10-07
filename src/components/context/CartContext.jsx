import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      // Check if item already exists in cart by both id and sizeId
      const existingItem = state.cart.find(
        (item) =>
          item.id === action.payload.id && item.sizeId === action.payload.sizeId
      );

      let newCart;

      if (existingItem) {
        // If item exists, increase the quantity
        newCart = state.cart.map((item) =>
          item.id === action.payload.id && item.sizeId === action.payload.sizeId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // If item doesn't exist, add the new item to the cart
        newCart = [...state.cart, { ...action.payload }];
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "REMOVE_ITEM": {
      // Remove item from cart based on id and sizeId
      const newCart = state.cart.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.sizeId === action.payload.sizeId
          )
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "INCREASE_ITEM": {
      // Increase quantity based on id and sizeId
      const newCart = state.cart.map((item) =>
        item.id === action.payload.id && item.sizeId === action.payload.sizeId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "DECREASE_ITEM": {
      // Decrease quantity based on id and sizeId
      const newCart = state.cart.map((item) =>
        item.id === action.payload.id && item.sizeId === action.payload.sizeId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "CLEAR_CART": {
      // Clear the entire cart
      localStorage.removeItem("cart");
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
