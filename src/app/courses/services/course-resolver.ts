import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { map, tap, first, filter } from "rxjs/operators";
import { CourseEntityService } from "./course-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private coursesService: CourseEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.coursesService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.coursesService.getAll();
        }
      }),
      filter(loaded => !!loaded),
      first()
    );
  }
}
