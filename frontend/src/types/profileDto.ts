export interface ProfileDto {
  name: string;
  about?: string;
  avatarUrl?: string;
  coverUrl?: string;
}

export interface UpdateProfileDto extends ProfileDto {}
