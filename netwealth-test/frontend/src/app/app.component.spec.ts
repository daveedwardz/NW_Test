import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {By} from "@angular/platform-browser";


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render 2 currency dropdowns', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let el = fixture.debugElement.queryAll(By.css('app-currency-picker'));
    console.log(el);
    expect(el.length).toBe(2);
  });
});
