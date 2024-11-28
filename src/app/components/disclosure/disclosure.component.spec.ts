import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisclosureComponent } from './disclosure.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationStateService } from '../../shared/services/application-state.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('DisclosureComponent', () => {
  let component: DisclosureComponent;
  let fixture: ComponentFixture<DisclosureComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let router: Router;
  let applicationState: ApplicationStateService;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) });

    await TestBed.configureTestingModule({
      imports: [
        DisclosureComponent,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        ApplicationStateService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DisclosureComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    router = TestBed.inject(Router);
    applicationState = TestBed.inject(ApplicationStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct steps', () => {
    expect(component.steps.length).toBe(3);
    expect(component.steps[0].active).toBe(true);
  });

  it('should initialize with correct disclosures', () => {
    expect(component.disclosures.length).toBe(2);
    expect(component.disclosures[0].title).toBe('Consumer Credit Report Access Authorization');
  });

  it('should open document viewer', () => {
    component.openDocument('Test Document');
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should navigate back to dashboard', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should check if can proceed', () => {
    expect(component.canProceed()).toBeFalse();
    component.disclosures.forEach(d => d.agreed = true);
    expect(component.canProceed()).toBeTrue();
  });

  it('should handle finish action', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const updateStatusSpy = spyOn(applicationState, 'updateDisclosureStatus');
    
    component.disclosures.forEach(d => d.agreed = true);
    component.onFinish();
    
    expect(updateStatusSpy).toHaveBeenCalledWith({
      completed: true,
      disabled: true
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });
});