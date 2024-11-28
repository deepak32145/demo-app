import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardholderDialogComponent } from './cardholder-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('CardholderDialogComponent', () => {
  let component: CardholderDialogComponent;
  let fixture: ComponentFixture<CardholderDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<CardholderDialogComponent>>;
  let router: Router;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        CardholderDialogComponent,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardholderDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<CardholderDialogComponent>>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default cardholders', () => {
    expect(component.cardholders.length).toBe(2);
    expect(component.cardholders[0].firstName).toBe('John');
  });

  it('should add new cardholder', () => {
    const initialLength = component.cardholders.length;
    component.addNewCardholder();
    expect(component.cardholders.length).toBe(initialLength + 1);
    expect(component.cardholders[component.cardholders.length - 1].firstName).toBe('');
  });

  it('should remove cardholder', () => {
    const initialLength = component.cardholders.length;
    component.removeCardholder(1);
    expect(component.cardholders.length).toBe(initialLength - 1);
  });

  it('should not remove first two cardholders', () => {
    component.removeCardholder(0);
    expect(component.cardholders.length).toBe(2);
  });

  it('should handle finish action', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onFinish();
    expect(dialogRef.close).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/document-upload']);
  });
});