## Ngrx (with NgRx Data) - The Complete Guide

`ng add @ngrx/store`
`ng add @ngrx/store-devtools`

Genreate a store called 'Auth' under 'auth' folder register it with auth.module.ts file
`ng generate store auth/Auth --module auth.module.ts`

### Action

```ts
export const login = createAction(
  "[Login Page] User Login",
  props<{ user: User }>()
);
```

### Reducer

```ts
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    };
  })
);
```
