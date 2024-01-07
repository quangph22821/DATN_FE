import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./redux/products.reducer";
import { CommentReducer } from "./redux/comment.reducer";


export const store = configureStore({
  reducer: {
   products: productReducer,
   Comment:CommentReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;