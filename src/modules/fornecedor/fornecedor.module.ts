import { Module } from '@nestjs/common';
import { FornecedorController } from './fornecedor.controller';
import { FornecedorService } from './fornecedor.service';
import { FornecedorRepository } from './fornecedor.repository';

@Module({
  controllers: [FornecedorController],
  providers: [FornecedorService, FornecedorRepository]
})
export class FornecedorModule {}