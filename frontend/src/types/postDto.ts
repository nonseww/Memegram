export interface CreatePostDto {
  title: string;
  description: string;
  image_url: string;
}

export type UpdatePostDto = Partial<CreatePostDto>;
