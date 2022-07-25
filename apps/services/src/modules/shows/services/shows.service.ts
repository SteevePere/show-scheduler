import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataProviderService } from 'src/modules/data-provider/services/data-provider.service';
import { Repository } from 'typeorm';
import { FindShowsData, FindShowsResult } from '../dtos/find-shows.dto';
import { ShowEntity } from '../entities/show.entity';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(ShowEntity)
    private readonly showsRepository: Repository<ShowEntity>,
    private readonly dataProviderService: DataProviderService,
  ) {}

  async findShows(data: FindShowsData): Promise<FindShowsResult> {
    return this.dataProviderService.findShows(data);
  }
}
