import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationStateService } from '../../../shared/services/application-state.service';

interface Cardholder {
  enabled: boolean;
  firstName: string;
  lastName: string;
  ssnLastFour: string;
  mobileNumber: string;
  cashAccess: boolean;
  fedexCards: boolean;
}

@Component({
  selector: 'app-cardholder-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './cardholder-dialog.component.html',
  styleUrls: ['./cardholder-dialog.component.css']
})
export class CardholderDialogComponent {
  cardholders: Cardholder[] = [
    {
      enabled: true,
      firstName: 'John',
      lastName: 'Doe',
      ssnLastFour: 'XXXX',
      mobileNumber: '(555) 555-1347',
      cashAccess: true,
      fedexCards: true
    },
    {
      enabled: false,
      firstName: 'Brian',
      lastName: 'Lara',
      ssnLastFour: 'XXXX',
      mobileNumber: '(555) 534-1230',
      cashAccess: false,
      fedexCards: false
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<CardholderDialogComponent>,
    private router: Router,
    private applicationState: ApplicationStateService
  ) {}

  addNewCardholder(): void {
    this.cardholders.push({
      enabled: true,
      firstName: '',
      lastName: '',
      ssnLastFour: '',
      mobileNumber: '',
      cashAccess: false,
      fedexCards: false
    });
  }

  removeCardholder(index: number): void {
    if (index > 1) {
      this.cardholders.splice(index, 1);
    }
  }

  onFinish(): void {
    this.applicationState.updateOfferAcceptanceStatus({
      completed: true,
      disabled: true
    });
    this.dialogRef.close();
    this.router.navigate(['/dashboard']);
  }
}