export interface ApplicantDetails {
  applicationNumber: string;
  borrowerName: string;
  productRequested: string;
  amountRequested: string;
  nextSteps: string[];
}

export interface VerificationResponse {
  success: boolean;
  applicantDetails: ApplicantDetails;
}