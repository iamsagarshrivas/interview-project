import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    else {
      const token = localStorage.getItem('token');
      const payload = decode(token);
      if(payload.role === 'candidate'){
        this.router.navigate(['candidate-dashboard']);

        return false

      }
      if(payload.role === 'interviewer'){
        this.router.navigate(['interviewer-panel']);
        return false

      }if(payload.role === 'admin'){
        this.router.navigate(['default-admin']);
        return false

      }


    }
  }

}
