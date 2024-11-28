import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CardholderDialogComponent } from './cardholder-dialog/cardholder-dialog.component';
import { ApplicationStateService } from '../../shared/services/application-state.service';

interface Offer {
  type: string;
  amount: string;
  interestRate: string;
  annualFee: string;
  originationFee: string;
  term?: string;
}

@Component({
  selector: 'app-offer-acceptance',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatStepperModule
  ],
  templateUrl: './offer-acceptance.component.html',
  styleUrls: ['./offer-acceptance.component.css']
})
export class OfferAcceptanceComponent {
  offers: Offer[] = [
    {
      type: 'Business Credit Card',
      amount: '$50,000',
      interestRate: 'Variable At Prime + 13.5%',
      annualFee: '$250',
      originationFee: '$450'
    },
    {
      type: 'Line of Credit',
      amount: '$100,000',
      interestRate: 'Variable At Prime + 13.5%',
      annualFee: '$250',
      originationFee: '$450'
    },
    {
      type: 'Term Loan',
      amount: '$100,000',
      interestRate: 'Variable At Prime + 13.5%',
      annualFee: '$250',
      originationFee: '$450',
      term: '60 months'
    }
  ];

  steps = [
    { label: 'Disclosures', completed: true },
    { label: 'Offer Acceptance', completed: false, active: true },
    { label: 'Document Upload', completed: false, active: false }
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private applicationState: ApplicationStateService
  ) {}

  onApprove(offer: Offer): void {
    if (offer.type === 'Business Credit Card') {
      const dialogRef = this.dialog.open(CardholderDialogComponent, {
        width: '80%',
        maxWidth: '1000px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(() => {
        // The navigation is now handled in the CardholderDialogComponent
      });
    } else {
      this.applicationState.updateOfferAcceptanceStatus({
        completed: true,
        disabled: true
      });
      this.router.navigate(['/dashboard']);
    }
  }

  onDecline(offer: Offer): void {
    // Handle decline logic
    this.router.navigate(['/dashboard']);
  }

  onBack(): void {
    this.router.navigate(['/dashboard']);
  }
}