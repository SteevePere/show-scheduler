import { IsBoolean, IsNotEmpty, IsNumberString, IsUUID, ValidateIf } from 'class-validator';

export class ToggleEpisodeWatchedRequest {
  @ValidateIf((request) => !request.externalId)
  @IsUUID()
  @IsNotEmpty()
  id?: string;
  
  @ValidateIf((request) => !request.id)
  @IsNumberString()
  externalId?: number;

  @IsBoolean()
  isWatched: boolean;
}