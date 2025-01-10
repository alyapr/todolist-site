import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Jika user sudah login, arahkan mereka ke dashboard
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return false;  // Tidak mengizinkan akses ke halaman login/register
    }
    return true;  // Mengizinkan akses ke halaman login/register
  }
}
