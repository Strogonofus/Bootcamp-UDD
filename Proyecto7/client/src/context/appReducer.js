export const initialState = {
  cart: [],
};

export function appReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const exists = state.cart.find((x) => x._id === item._id);

      const cart = exists
        ? state.cart.map((x) =>
            x._id === item._id ? { ...x, qty: x.qty + 1 } : x
          )
        : [...state.cart, { ...item, qty: 1 }];

      return { ...state, cart };
    }

    case "UPDATE_QTY": {
      const { id, qty } = action.payload;
      const cart = state.cart
        .map((x) => (x._id === id ? { ...x, qty } : x))
        .filter((x) => x.qty > 0);

      return { ...state, cart };
    }

    case "REMOVE_FROM_CART": {
      const id = action.payload;
      return { ...state, cart: state.cart.filter((x) => x._id !== id) };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
}