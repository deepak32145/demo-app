import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isVerifiedSubject = new BehaviorSubject<boolean>(false);
  isVerified$ = this.isVerifiedSubject.asObservable();

  setVerificationStatus(status: boolean): void {
    this.isVerifiedSubject.next(status);
  }

  isVerified(): boolean {
    return this.isVerifiedSubject.value;
  }
}