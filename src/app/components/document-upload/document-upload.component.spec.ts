import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentUploadComponent } from './document-upload.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationStateService } from '../../shared/services/application-state.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DocumentUploadComponent', () => {
  let component: DocumentUploadComponent;
  let fixture: ComponentFixture<DocumentUploadComponent>;
  let applicationState: ApplicationStateService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DocumentUploadComponent,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [ApplicationStateService]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentUploadComponent);
    component = fixture.componentInstance;
    applicationState = TestBed.inject(ApplicationStateService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct document types', () => {
    expect(component.documentTypes.length).toBe(5);
    expect(component.documentTypes[0].name).toBe('Last 3 Months Of Business Bank Statements (digitally)');
  });

  it('should initialize with correct steps', () => {
    expect(component.steps.length).toBe(3);
    expect(component.steps[0].completed).toBe(true);
    expect(component.steps[2].active).toBe(true);
  });

  it('should handle file upload', () => {
    const mockFile = new File([''], 'test.pdf', { type: 'application/pdf' });
    const mockEvent = { target: { files: [mockFile] } };
    
    spyOn(document, 'createElement').and.returnValue({
      type: '',
      accept: '',
      click: () => {},
      onchange: null
    } as any);

    component.onUpload(component.documentTypes[0]);
    const input = document.createElement('input');
    input.onchange(mockEvent);

    expect(component.documentTypes[0].uploadedFiles?.includes('test.pdf')).toBe(true);
  });

  it('should navigate back to dashboard', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should update status and navigate on finish', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const updateStatusSpy = spyOn(applicationState, 'updateDocumentUploadStatus');
    
    component.onFinish();
    
    expect(updateStatusSpy).toHaveBeenCalledWith({
      completed: true,
      disabled: true
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });
});