import { Module } from '@nestjs/common';
import { CompraController } from './compra.controller';
import { CompraService } from './compra.service';
import { CompraRepository } from './compra.repository';

@Module({
  controllers: [CompraController],
  providers: [CompraService, CompraRepository]
})
export class CompraModule {}