import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { compareCourses, Course } from "../model/course";
import { Observable } from "rxjs";
import { defaultDialogConfig } from "../shared/default-dialog-config";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { MatDialog } from "@angular/material";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { map } from "rxjs/operators";
import * as coursesSelector from "../courses.selectors";
import { CourseEntityService } from "../services/course-entity.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private courseService: CourseEntityService
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.courseService.entities$.pipe(
      map(courses => courses.filter(c => c.category === "BEGINNER"))
    );

    this.advancedCourses$ = this.courseService.entities$.pipe(
      map(courses => courses.filter(c => c.category === "ADVANCED"))
    );

    this.promoTotal$ = this.courseService.entities$.pipe(
      map(courses => courses.filter(c => c.promo).length)
    );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: "create"
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
