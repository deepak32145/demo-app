import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

interface DocumentData {
  title: string;
  content?: string;
  type: 'disclosure' | 'other';
}

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent {
  currentPage = 1;
  totalPages = 1;
  showNavigation = true;

  constructor(
    public dialogRef: MatDialogRef<DocumentViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DocumentData,
    private snackBar: MatSnackBar
  ) {}

  onPrint(): void {
    window.print();
  }

  onSave(): void {
    const blob = new Blob([this.getDocumentContent()], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.data.title.toLowerCase().replace(/\s+/g, '_')}.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
    this.showNotification('Document saved successfully');
  }

  onPrevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  private showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  private getDocumentContent(): string {
    // In a real application, this would return the actual document content
    return 'Sample document content';
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onAgree(): void {
    this.dialogRef.close(true);
    this.showNotification('Document agreed successfully');
  }
}