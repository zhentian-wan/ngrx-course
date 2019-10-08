import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { CoursesAction } from "./actions-types";
import { tap, first, finalize, filter } from "rxjs/operators";
import { adapter } from "./reducers/courses.reducers";
import { selectAllCoursesLoaded } from "./courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(selectAllCoursesLoaded),
      tap(courseLoaded => {
        if (!this.loading && !courseLoaded) {
          this.loading = true;
          this.store.dispatch(CoursesAction.loadAllCourse());
        }
      }),
      // this resolve need to complete, so we can use first()
      filter(courseLoaded => courseLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
