import { AuthConfig } from "angular-oauth2-oidc"; 

export const auth: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin,
  clientId: '455010258818-9kcacmchn0n86m16omcdlq3dibl8tjf3.apps.googleusercontent.com',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false,
};