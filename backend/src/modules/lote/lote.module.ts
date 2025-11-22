import { Module } from '@nestjs/common';
import { LoteController } from './lote.controller';
import { LoteService } from './lote.service';
import { LoteRepository } from './lote.repository';

@Module({
  controllers: [LoteController],
  providers: [LoteService, LoteRepository]
})
export class LoteModule {}