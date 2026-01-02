import { Injectable, inject, signal } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import  { auth } from './auth.config';
import { Router } from '@angular/router';
import { AuthService } from './AuthService.service';

@Injectable({
  providedIn: 'root',
})
export class AuthgoogleService {

  private oauthService: OAuthService = inject(OAuthService);
  private router = inject(Router);
  profile= signal<any>(null);
  authState: any;

  
  constructor() { 
    this.initConfiguration();
  }

  private authService = inject(AuthService);

  initConfiguration() { 
  this.oauthService.configure(auth);
  this.oauthService.setupAutomaticSilentRefresh();
  this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
    if (this.oauthService.hasValidAccessToken()) {
      const claims = this.oauthService.getIdentityClaims();
      this.profile.set(claims);
      
      this.authService.loginNoBackEnd(claims).subscribe(); 
    }
  });
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
    this.profile.set(null);
    this.router.navigate(['']);
  }

  getLoggedProfile() {
    return this.profile();
  }
}
