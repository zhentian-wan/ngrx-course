import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { CoursesAction } from "./actions-types";
import { tap, first, finalize } from "rxjs/operators";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(CoursesAction.loadAllCourse());
        }
      }),
      // this resolve need to complete, so we can use first()
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
