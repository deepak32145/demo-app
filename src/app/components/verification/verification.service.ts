import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { VerificationResponse } from '../../shared/interfaces/applicant.interface';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  verifyCredentials(credentials: { passcode: string; ssnLastFour: string }): Observable<VerificationResponse> {
    // Simulate API call
    return of({
      success: true,
      applicantDetails: {
        applicationNumber: '7546876',
        borrowerName: 'ABC, Inc.',
        productRequested: 'Business Credit Card',
        amountRequested: 'N/A',
        nextSteps: ['Review Disclosures', 'Offer Acceptance', 'Document Upload']
      }
    }).pipe(delay(1000));
  }

  initiateVerification(): Observable<boolean> {
    return of(true).pipe(delay(1000));
  }
}