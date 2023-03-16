export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends SignInCredentials{
  displayName: string;
}