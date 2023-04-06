import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { BehaviorSubject, Subject, combineLatest, of } from 'rxjs';
import { map, scan, share, startWith, tap } from 'rxjs/operators';
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public navigate$ = new Subject<number>();

  public date$ = this.navigate$.pipe(
    startWith(0),
    scan((date, navigate) => {
      date = new Date(date);
      date.setDate(date.getDate() + navigate);
      return date;
    }, new Date(Date.UTC(2023, 4, 6)))
  );

  constructor() {}
}
