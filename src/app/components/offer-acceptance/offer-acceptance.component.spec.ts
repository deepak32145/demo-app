import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfferAcceptanceComponent } from './offer-acceptance.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationStateService } from '../../shared/services/application-state.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('OfferAcceptanceComponent', () => {
  let component: OfferAcceptanceComponent;
  let fixture: ComponentFixture<OfferAcceptanceComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let router: Router;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) });

    await TestBed.configureTestingModule({
      imports: [
        OfferAcceptanceComponent,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        ApplicationStateService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OfferAcceptanceComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct offers', () => {
    expect(component.offers.length).toBe(3);
    expect(component.offers[0].type).toBe('Business Credit Card');
  });

  it('should open cardholder dialog when approving credit card offer', () => {
    const creditCardOffer = component.offers[0];
    component.onApprove(creditCardOffer);
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should not open dialog for non-credit card offers', () => {
    const lineOfCreditOffer = component.offers[1];
    component.onApprove(lineOfCreditOffer);
    expect(dialog.open).not.toHaveBeenCalled();
  });

  it('should handle decline action', () => {
    const declineSpy = spyOn(console, 'log');
    component.onDecline(component.offers[0]);
    expect(declineSpy).not.toHaveBeenCalled();
  });

  it('should navigate back to dashboard', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });
});