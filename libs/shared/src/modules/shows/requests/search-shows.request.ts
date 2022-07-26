import { IsOptional, IsString } from 'class-validator';

export class SearchShowsRequest {
  @IsOptional()
  @IsString()
  query: string;
}