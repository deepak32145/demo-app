import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApplicantDetails } from '../../shared/interfaces/applicant.interface';
import { ApplicationStateService, StepStatus } from '../../shared/services/application-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  applicantDetails: ApplicantDetails = {
    applicationNumber: '7546876',
    borrowerName: 'ABC, Inc.',
    productRequested: 'Business Credit Card',
    amountRequested: 'N/A',
    nextSteps: ['Review Disclosures', 'Offer Acceptance', 'Document Upload']
  };

  disclosureStatus: StepStatus = {
    completed: false,
    disabled: false
  };

  offerAcceptanceStatus: StepStatus = {
    completed: false,
    disabled: false
  };

  documentUploadStatus: StepStatus = {
    completed: false,
    disabled: false
  };

  constructor(
    private router: Router,
    private applicationState: ApplicationStateService
  ) {}

  ngOnInit(): void {
    this.applicationState.disclosureStatus$.subscribe(status => {
      this.disclosureStatus = status;
      if (status.completed) {
        this.offerAcceptanceStatus = { ...this.offerAcceptanceStatus, disabled: false };
      }
    });

    this.applicationState.offerAcceptanceStatus$.subscribe(status => {
      this.offerAcceptanceStatus = status;
      if (status.completed) {
        this.documentUploadStatus = { ...this.documentUploadStatus, disabled: false };
      }
    });

    this.applicationState.documentUploadStatus$.subscribe(status => {
      this.documentUploadStatus = status;
    });
  }

  onBack(): void {
    this.router.navigate(['/verify']);
  }

  navigateToStep(step: string): void {
    switch(step) {
      case 'Review Disclosures':
        if (!this.disclosureStatus.disabled) {
          this.router.navigate(['/disclosures']);
        }
        break;
      case 'Offer Acceptance':
        if (!this.offerAcceptanceStatus.disabled && this.disclosureStatus.completed) {
          this.router.navigate(['/offer-acceptance']);
        }
        break;
      case 'Document Upload':
        if (!this.documentUploadStatus.disabled && this.offerAcceptanceStatus.completed) {
          this.router.navigate(['/document-upload']);
        }
        break;
    }
  }

  getStepIcon(step: string): string {
    switch(step) {
      case 'Review Disclosures':
        return this.disclosureStatus.completed ? 'check_circle' : 'chevron_right';
      case 'Offer Acceptance':
        return this.offerAcceptanceStatus.completed ? 'check_circle' : 'chevron_right';
      case 'Document Upload':
        return this.documentUploadStatus.completed ? 'check_circle' : 'chevron_right';
      default:
        return 'chevron_right';
    }
  }

  isStepDisabled(step: string): boolean {
    switch(step) {
      case 'Review Disclosures':
        return this.disclosureStatus.disabled;
      case 'Offer Acceptance':
        return this.offerAcceptanceStatus.disabled || !this.disclosureStatus.completed;
      case 'Document Upload':
        return this.documentUploadStatus.disabled || !this.offerAcceptanceStatus.completed;
      default:
        return false;
    }
  }
}