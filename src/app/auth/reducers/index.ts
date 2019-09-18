import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from "@ngrx/store";
import { User } from "../model/user.model";
import { AuthActions } from "../action-types";

export interface AuthState {
  user: User;
}

export const initialAuthState = {
  user: null
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    };
  })
);
