import { Injectable, inject, signal } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import  { auth } from './auth.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthgoogleService {

  private oauthService: OAuthService = inject(OAuthService);
  private router = inject(Router);
  profile= signal<any>(null);

  
  constructor() { 
    this.initConfiguration();
  }

  initConfiguration() { 
    this.oauthService.configure(auth);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.profile.set(this.oauthService.getIdentityClaims());
      };
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
