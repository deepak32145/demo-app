import { Routes } from '@angular/router';
import { VerificationComponent } from './components/verification/verification.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisclosureComponent } from './components/disclosure/disclosure.component';
import { OfferAcceptanceComponent } from './components/offer-acceptance/offer-acceptance.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'verify', pathMatch: 'full' },
  { path: 'verify', component: VerificationComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'disclosures', 
    component: DisclosureComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'offer-acceptance', 
    component: OfferAcceptanceComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'document-upload', 
    component: DocumentUploadComponent,
    canActivate: [AuthGuard]
  }
];