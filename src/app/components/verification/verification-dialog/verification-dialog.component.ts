import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VerificationService } from '../verification.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-verification-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './verification-dialog.component.html',
  styleUrls: ['./verification-dialog.component.css']
})
export class VerificationDialogComponent {
  verificationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private verificationService: VerificationService,
    private dialogRef: MatDialogRef<VerificationDialogComponent>,
    private router: Router,
    private authService: AuthService
  ) {
    this.verificationForm = this.fb.group({
      passcode: ['', [Validators.required, Validators.minLength(6)]],
      ssnLastFour: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }

  onSubmit(): void {
    if (this.verificationForm.valid) {
      this.verificationService.verifyCredentials(this.verificationForm.value)
        .subscribe(response => {
          if (response.success) {
            this.authService.setVerificationStatus(true);
            this.dialogRef.close();
            this.router.navigate(['/dashboard']);
          }
        });
    }
  }

  onResend(): void {
    this.verificationService.initiateVerification().subscribe();
  }
}