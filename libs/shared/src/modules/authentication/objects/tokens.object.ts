import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TokensObject {
  @ApiProperty({
    description: 'Authenticated User',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJJZCI6ImU2OWNlMjE4LWQzYjMtNGZkNy05OGQ0LWRkOGZiMjdlOTE1MiIsImlhdCI6MTY1OTY4Nzc3MCwiZXhwIjoxNjU5NzIzNzcwfQ.QlENTbEsRS9q3LAFKsJm_8Z5-dgYOtF3PRLuP5JkU8g'
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}