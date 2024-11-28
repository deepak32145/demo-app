import { TestBed } from '@angular/core/testing';
import { ApplicationStateService } from './application-state.service';

describe('ApplicationStateService', () => {
  let service: ApplicationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationStateService]
    });
    service = TestBed.inject(ApplicationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update disclosure status', (done) => {
    const newStatus = { completed: true, disabled: true };
    
    service.disclosureStatus$.subscribe(status => {
      if (status.completed) {
        expect(status).toEqual(newStatus);
        done();
      }
    });

    service.updateDisclosureStatus(newStatus);
  });

  it('should update offer acceptance status', (done) => {
    const newStatus = { completed: true, disabled: true };
    
    service.offerAcceptanceStatus$.subscribe(status => {
      if (status.completed) {
        expect(status).toEqual(newStatus);
        done();
      }
    });

    service.updateOfferAcceptanceStatus(newStatus);
  });

  it('should update document upload status', (done) => {
    const newStatus = { completed: true, disabled: true };
    
    service.documentUploadStatus$.subscribe(status => {
      if (status.completed) {
        expect(status).toEqual(newStatus);
        done();
      }
    });

    service.updateDocumentUploadStatus(newStatus);
  });

  it('should initialize with default values', (done) => {
    service.disclosureStatus$.subscribe(status => {
      expect(status).toEqual({ completed: false, disabled: false });
      done();
    });
  });
});