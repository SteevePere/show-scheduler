import { IsOptional, IsString } from 'class-validator';

export class FindShowsRequest {
  @IsOptional()
  @IsString()
  query: string;
}