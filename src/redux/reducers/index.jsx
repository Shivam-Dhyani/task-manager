import usersReducer from "./users";
import productsReducer from "./products";
// export type StateType = {
//   // Reducers types here
// };

const rootReducers = {
  // Reducers here
  users: usersReducer,
  products: productsReducer,
};

export default rootReducers;
