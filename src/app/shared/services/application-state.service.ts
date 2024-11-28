import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface StepStatus {
  completed: boolean;
  disabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {
  private disclosureStatus = new BehaviorSubject<StepStatus>({
    completed: false,
    disabled: false
  });

  private offerAcceptanceStatus = new BehaviorSubject<StepStatus>({
    completed: false,
    disabled: false
  });

  private documentUploadStatus = new BehaviorSubject<StepStatus>({
    completed: false,
    disabled: false
  });

  disclosureStatus$ = this.disclosureStatus.asObservable();
  offerAcceptanceStatus$ = this.offerAcceptanceStatus.asObservable();
  documentUploadStatus$ = this.documentUploadStatus.asObservable();

  updateDisclosureStatus(status: StepStatus): void {
    this.disclosureStatus.next(status);
  }

  updateOfferAcceptanceStatus(status: StepStatus): void {
    this.offerAcceptanceStatus.next(status);
  }

  updateDocumentUploadStatus(status: StepStatus): void {
    this.documentUploadStatus.next(status);
  }
}