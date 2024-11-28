import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VerificationComponent } from './verification.component';
import { VerificationService } from './verification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('VerificationComponent', () => {
  let component: VerificationComponent;
  let fixture: ComponentFixture<VerificationComponent>;
  let verificationService: jasmine.SpyObj<VerificationService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('VerificationService', ['initiateVerification']);
    spy.initiateVerification.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [
        VerificationComponent,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: VerificationService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationComponent);
    component = fixture.componentInstance;
    verificationService = TestBed.inject(VerificationService) as jasmine.SpyObj<VerificationService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render welcome message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome!');
  });

  it('should render verification instructions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Let us verify you');
  });

  it('should call initiateVerification on verify button click', fakeAsync(() => {
    spyOn(console, 'log');
    const button = fixture.nativeElement.querySelector('.verify-button');
    button.click();
    tick(1000);

    expect(verificationService.initiateVerification).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Verification initiated');
  }));

  it('should have proper styling classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.verification-container')).toBeTruthy();
    expect(compiled.querySelector('.green-section')).toBeTruthy();
    expect(compiled.querySelector('.white-section')).toBeTruthy();
  });
});