import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  postId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
