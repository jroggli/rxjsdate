import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { skip } from 'rxjs/operators';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture;
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('output should emit current output', (done: DoneFn) => {
    const output = new Date();
    app.output$.subscribe((output) => {
      expect(output).toBe(0);
      done();
    });
  });

  it('when input is set, output emits the value', (done: DoneFn) => {
    app.output$.pipe(skip(1)).subscribe((output) => {
      expect(output).toBe(2019);
      done();
    });
    app.input$.next(2019);
  });

  describe('navigate ', () => {
    it('+1', (done: DoneFn) => {
      done();

      app.navigate$.next(1);
    });
    it('-1', (done: DoneFn) => {
      done();

      app.navigate$.next(1);
    });
  });
});
