import { IsNumberString } from 'class-validator';

export class IdDTO {
  @IsNumberString()
  id: number;
}
