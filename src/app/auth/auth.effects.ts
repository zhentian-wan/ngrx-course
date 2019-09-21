import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { AuthActions } from "./action-types";

import { tap } from "rxjs/operators";

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private router: Router) {}

  login$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.login),
        tap(action => {
          localStorage.setItem("user", JSON.stringify(action.user));
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.logout),
        tap(action => localStorage.removeItem("user")),
        tap(() => this.router.navigateByUrl("/"))
      ),
    { dispatch: false }
  );
}
