export interface User {
  id: number;
  email: string;
  name: string;
  username: string;
  role: string;
  avatar_url?: string;
  about?: string;
}
