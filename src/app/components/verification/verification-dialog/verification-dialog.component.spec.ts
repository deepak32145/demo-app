import { TestBed, ComponentFixture } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { of } from "rxjs";
import { VerificationDialogComponent } from "./verification-dialog.component";
import { VerificationService } from "../verification.service";
import { AuthService } from "../../../shared/services/auth.service";

describe("VerificationDialogComponent", () => {
  let component: VerificationDialogComponent;
  let fixture: ComponentFixture<VerificationDialogComponent>;
  let verificationServiceMock: any;
  let authServiceMock: any;
  let dialogRefMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Mocks
    verificationServiceMock = {
      verifyCredentials: jasmine
        .createSpy("verifyCredentials")
        .and.returnValue(of({ success: true })),
      initiateVerification: jasmine
        .createSpy("initiateVerification")
        .and.returnValue(of({})),
    };

    authServiceMock = {
      setVerificationStatus: jasmine.createSpy("setVerificationStatus"),
    };

    dialogRefMock = {
      close: jasmine.createSpy("close"),
    };

    routerMock = {
      navigate: jasmine.createSpy("navigate"),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [VerificationDialogComponent],
      providers: [
        { provide: VerificationService, useValue: verificationServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize the form with default values and validations", () => {
    const form = component.verificationForm;
    expect(form).toBeDefined();
    expect(form.get("passcode")?.hasValidator(Validators.required)).toBeTrue();
    expect(
      form.get("passcode")?.hasValidator(Validators.minLength(6))
    ).toBeTrue();
    expect(
      form.get("ssnLastFour")?.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      form.get("ssnLastFour")?.hasValidator(Validators.pattern("^[0-9]{4}$"))
    ).toBeTrue();
  });

  it("should call verifyCredentials and navigate on valid form submission", () => {
    component.verificationForm.setValue({
      passcode: "123456",
      ssnLastFour: "1234",
    });

    component.onSubmit();

    expect(verificationServiceMock.verifyCredentials).toHaveBeenCalledWith({
      passcode: "123456",
      ssnLastFour: "1234",
    });
    expect(authServiceMock.setVerificationStatus).toHaveBeenCalledWith(true);
    expect(dialogRefMock.close).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(["/dashboard"]);
  });

  it("should not call verifyCredentials if the form is invalid", () => {
    component.verificationForm.setValue({ passcode: "", ssnLastFour: "" });

    component.onSubmit();

    expect(verificationServiceMock.verifyCredentials).not.toHaveBeenCalled();
  });

  it("should call initiateVerification on resend", () => {
    component.onResend();

    expect(verificationServiceMock.initiateVerification).toHaveBeenCalled();
  });
});
