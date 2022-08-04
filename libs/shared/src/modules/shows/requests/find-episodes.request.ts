import { IsNotEmpty, IsNumberString, IsOptional, IsUUID } from "class-validator";

import { TimeFramedRequest } from "../../shared/requests/time-framed-request.request";

export class FindEpisodesRequest extends TimeFramedRequest {
  @IsOptional()
  @IsNumberString()
  skip: number;
  
  @IsOptional()
  @IsNumberString()
  limit: number;
  
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  showId?: string;
}