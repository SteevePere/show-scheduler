import { IsNotEmpty, IsUUID } from "class-validator";

export class RemoveFavoriteRequest {
  @IsUUID()
  @IsNotEmpty()
  showId: string;
}