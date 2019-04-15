import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.expectedRole;
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');

      const payload = decode(token);
      if (
        !this.auth.isAuthenticated() ||
        payload.role !== expectedRole
      ) {
        console.log(expectedRole);
        if (payload.role === 'admin') {
          this.router.navigate(['/default-admin']);

          return false;
        }
        else if (payload.role === 'interviewer') {
          this.router.navigate(['/interviewer-panel']);
          return false;
        }
        else if (payload.role === 'candidate') {
          this.router.navigate(['candidate-dashboard']);
          return false;
        }
        else {
          this.router.navigate(['/login']);
          return false;
        }
      }
      return true;
    }
  }

}
