import { Module } from '@nestjs/common';
import { PessoaController } from './pessoa.controller';
import { PessoaService } from './pessoa.service';
import { PessoaRepository } from './pessoa.repository';

@Module({
  controllers: [PessoaController],
  providers: [PessoaService, PessoaRepository]
})
export class PessoaModule {}