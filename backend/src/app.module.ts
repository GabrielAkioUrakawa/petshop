import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoaModule } from './modules/pessoa/pessoa.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { AnimalModule } from './modules/animal/animal.module';
import { ServicoModule } from './modules/servico/servico.module';
import { CompraModule } from './modules/compra/compra.module';
import { FornecedorModule } from './modules/fornecedor/fornecedor.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { LoteModule } from './modules/lote/lote.module';

@Module({
  imports: [
    PessoaModule,
    ClienteModule,
    FuncionarioModule,
    AnimalModule,
    ServicoModule,
    CompraModule,
    FornecedorModule,
    ProdutoModule,
    LoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
