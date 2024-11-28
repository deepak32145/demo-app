import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { ApplicationStateService } from '../../shared/services/application-state.service';

interface DocumentType {
  name: string;
  uploadedFiles?: string[];
  notes?: string;
  status?: 'error' | 'success';
}

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent {
  documentTypes: DocumentType[] = [
    {
      name: 'Last 3 Months Of Business Bank Statements (digitally)',
      uploadedFiles: [
        'Bank_statements_Aug2024.pdf',
        'Bank_statements_Sep2024.pdf',
        'Bank_statements_Oct2024.pdf'
      ],
      notes: 'Documents are incorrect, please upload it again',
      status: 'error'
    },
    {
      name: 'Proof tax lien has been satisfied',
      uploadedFiles: ['Tax_proof_Sep2024.pdf'],
      status: 'success'
    },
    {
      name: 'Certification of Formation/Article of Organization',
      uploadedFiles: ['Certificate_of_formation.pdf'],
      status: 'success'
    },
    {
      name: 'XXXXXXX',
      uploadedFiles: ['XXXX.pdf'],
      status: 'success'
    },
    {
      name: 'Operating Agreement / Banking Resolution',
      uploadedFiles: ['Operation_agreement.pdf'],
      status: 'success'
    }
  ];

  steps = [
    { label: 'Disclosures', completed: true },
    { label: 'Offer Acceptance', completed: true },
    { label: 'Document Upload', completed: false, active: true }
  ];

  constructor(
    private router: Router,
    private applicationState: ApplicationStateService
  ) {}

  onUpload(documentType: DocumentType): void {
    // Handle file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        // Simulate file upload
        documentType.uploadedFiles = documentType.uploadedFiles || [];
        documentType.uploadedFiles.push(file.name);
      }
    };
    input.click();
  }

  onBack(): void {
    this.router.navigate(['/dashboard']);
  }

  onFinish(): void {
    // Update application state and navigate back to dashboard
    this.applicationState.updateDocumentUploadStatus({
      completed: true,
      disabled: true
    });
    this.router.navigate(['/dashboard']);
  }
}