import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatStepperModule } from "@angular/material/stepper";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { DocumentViewerComponent } from "./document-viewer/document-viewer.component";
import { Router } from "@angular/router";
import { ApplicationStateService } from "../../shared/services/application-state.service";
import { DataSharingService } from "../../service/data-sharing.service";

@Component({
  selector: "app-disclosure",
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: "./disclosure.component.html",
  styleUrls: ["./disclosure.component.css"],
})
export class DisclosureComponent implements OnInit {
  steps = [
    { label: "Disclosures", completed: false, active: true },
    { label: "Offer Acceptance", completed: false, active: false },
    { label: "Document Upload", completed: false, active: false },
  ];

  disclosures = [
    {
      title: "Consumer Credit Report Access Authorization",
      content: `As used herein, the term "you" refers to the business loan/credit applicant (the "Applicant"), regardless of whether the Applicant is submitting the application on their own behalf or whether an agent of the Applicant is submitting the application on the Applicant's behalf...`,
      agreed: false,
      type: "disclosure",
    },
    {
      title: "Other Disclosures",
      subItems: [
        "Beneficial Ownership Attestation Form",
        "Authorization For The Social Security Administration To Disclose Your Social Security Number Verification",
        "Business Credit Application Acknowledgement And Agreements",
        "E-Sign Consents",
      ],
      agreed: false,
      type: "other",
    },
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private applicationState: ApplicationStateService,
    private dataSharingService: DataSharingService
  ) {}

  openDocument(document: string, type: "disclosure" | "other" = "other"): void {
    const dialogRef = this.dialog.open(DocumentViewerComponent, {
      width: "80%",
      height: "80%",
      data: { title: document, type },
      panelClass: "document-viewer-dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle agreement
        const disclosure = this.disclosures.find(
          (d) =>
            d.title === document ||
            (d.subItems && d.subItems.includes(document))
        );
        if (disclosure) {
          disclosure.agreed = true;
        }
      }
    });
  }

  onBack(): void {
    this.router.navigate(["/dashboard"]);
  }
  ngOnInit(): void {
    this.dataSharingService.data$.subscribe((data) => {
      if (data) {
        this.disclosures = data.disclosures;
      }
    });
  }

  canProceed(): boolean {
    return this.disclosures.every((d) => d.agreed);
  }

  onFinish(): void {
    if (this.canProceed()) {
      this.applicationState.updateDisclosureStatus({
        completed: true,
        disabled: true,
      });
      this.router.navigate(["/dashboard"]);
    }
  }
}
