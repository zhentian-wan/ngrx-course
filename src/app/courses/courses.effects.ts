import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { createEffect } from "@ngrx/effects";
import { CoursesAction } from "./actions-types";
import { CoursesHttpService } from "./services/courses-http.service";
import { concatMap, map, tap } from "rxjs/operators";

@Injectable()
export class CoursesEffects {
  constructor(
    private action$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {}

  loadAllCourses$ = createEffect(() =>
    this.action$.pipe(
      tap(() => console.log("effect")),
      ofType(CoursesAction.loadAllCourse),
      concatMap(() => this.coursesHttpService.findAllCourses()),
      map(courses => CoursesAction.allCoursesLoaded(courses))
    )
  );
}
