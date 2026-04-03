export interface JwtPayload {
  sub: number;
  email: string;
  roles?: string[];
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: Omit<any, 'password'>;
  tokens: Tokens;
}
