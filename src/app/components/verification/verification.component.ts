import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VerificationService } from './verification.service';
import { VerificationDialogComponent } from './verification-dialog/verification-dialog.component';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  constructor(
    private dialog: MatDialog,
    private verificationService: VerificationService
  ) {}

  onVerifyClick(): void {
    this.verificationService.initiateVerification().subscribe(success => {
      if (success) {
        this.dialog.open(VerificationDialogComponent, {
          width: '100%',
          maxWidth: '500px',
          panelClass: 'verification-dialog-container',
          disableClose: true
        });
      }
    });
  }
}