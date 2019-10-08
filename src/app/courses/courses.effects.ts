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
      ofType(CoursesAction.loadAllCourse),
      concatMap(() => this.coursesHttpService.findAllCourses()),
      map(courses => CoursesAction.allCoursesLoaded({ courses }))
    )
  );

  saveCourse$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(CoursesAction.courseUpdated),
        concatMap(action =>
          this.coursesHttpService.saveCourse(
            action.update.id,
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );
}
