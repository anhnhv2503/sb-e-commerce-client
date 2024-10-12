import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.cart.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.sizeId.id === action.payload.sizeId.id
      );
      let newCart;
      if (existingItem) {
        newCart = state.cart.map((item) =>
          item.productId === action.payload.productId &&
          item.sizeId.id === action.payload.sizeId.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newCart = [...state.cart, { ...action.payload }];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "REMOVE_ITEM": {
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
      const newCart = state.cart.map((item) =>
        item.id === action.payload.id && item.sizeId === action.payload.sizeId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "DECREASE_ITEM": {
      const newCart = state.cart.map((item) =>
        item.id === action.payload.id && item.sizeId === action.payload.sizeId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "CLEAR_CART": {
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
