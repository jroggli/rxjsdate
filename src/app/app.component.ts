import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { scan, share, startWith, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public navigate$ = new Subject<number>();
  public input$ = new Subject<number>();

  // const inp$: 1--1--1--2--2--2--2--2--
  // const nav$: -1--1-----1---2--1------

  // const out$  12-12-1--23-2-42-32--2--|
  public output$ = this.input$.pipe(
    startWith(0),
    switchMap((input) =>
      this.navigate$.pipe(
        startWith(0),
        scan((acc, val) => acc + val, input)
      )
    ),
    share()
  );

  constructor() {
    this.output$.subscribe();
    this.output$.subscribe();
  }

  public setValue(event: Event): void {
    this.input$.next(Number.parseInt((event.target as any).value));
  }
}
