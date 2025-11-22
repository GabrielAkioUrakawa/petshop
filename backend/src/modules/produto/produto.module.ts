import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { ProdutoRepository } from './produto.repository';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutoRepository]
})
export class ProdutoModule {}