export class User {
  id?: number;
  username!: string;
  name!: string;
  email!: string;
  password!: string;
  role!: string | null;
  about?: string | null;
  avatar_url?: string | null;
  cover_url?: string | null;
  created_at?: Date | null;
}
