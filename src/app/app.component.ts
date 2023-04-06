import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { map, scan, share, startWith, tap } from 'rxjs/operators';
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public date$ = new BehaviorSubject<Date>(new Date(Date.UTC(2000, 0, 1)));

  public navigate$ = new Subject<number>();

  public result$ = combineLatest([
    this.date$,
    this.navigate$.pipe(
      startWith(0),
      scan((acc, val) => acc + val, 0)
    ),
  ]).pipe(
    map(([date, navigate]) => {
      date = new Date(date);
      date.setDate(date.getDate() + navigate);
      return date;
    }),
    share()
  );

  public resultText = this.result$.pipe(
    map((date) => date.toLocaleDateString())
  );

  constructor() {}

  public setDate(event: Event) {
    const date = (event.target as HTMLInputElement).valueAsDate;
    if (!date) return;
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    this.date$.next(utcDate ?? new Date());
  }

  public navigateNext(): void {
    this.navigate$.next(1);
  }
}
