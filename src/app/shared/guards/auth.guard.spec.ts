import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, AuthService]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to verify page when not verified', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const result = guard.canActivate();
    
    expect(result).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/verify']);
  });

  it('should allow navigation when verified', () => {
    authService.setVerificationStatus(true);
    const result = guard.canActivate();
    
    expect(result).toBeTrue();
  });
});