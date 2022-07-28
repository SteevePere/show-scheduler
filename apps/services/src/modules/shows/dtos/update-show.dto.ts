import { ShowObject } from '@scheduler/shared';
import { DeepPartial } from 'typeorm';
import { ShowEntity } from '../entities/show.entity';

export class UpdateShowData {
  id: string;
  data: DeepPartial<ShowEntity>;
}

export class UpdateShowResult {
  show: ShowObject;
}
