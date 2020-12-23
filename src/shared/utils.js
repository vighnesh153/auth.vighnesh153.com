export class AuthUtil {
  constructor(searchParams) {
    this.params = new URLSearchParams(searchParams);

    this.hasLoginSucceeded = this.params.has('loginSuccess');
    this.hasLoginFailed = this.params.has('failed');
    this.accessDenied = this.params.has('accessDenied');
  }

  getParam(name) {
    return this.params.get(name);
  }

  // This returns true if some app made a request to do
  // or verify auth
  shouldInitiateAuth() {
    return !this.hasLoginSucceeded &&
      !this.hasLoginFailed &&
      !this.accessDenied;
  }
}
