import { Injectable } from '@nestjs/common';
import { PessoaRepository } from './pessoa.repository';

@Injectable()
export class PessoaService {
  constructor(private readonly pessoaRepository: PessoaRepository) {}

  async create(cpf: string, nome: string, email: string, telefone: string, endereco: string) {
    return this.pessoaRepository.create(cpf, nome, email, telefone, endereco);
  }

  async findAll() {
    return this.pessoaRepository.findAll();
  }

  async findByCpf(cpf: string) {
    return this.pessoaRepository.findByCpf(cpf);
  }

  async update(cpf: string, nome: string, email: string, telefone: string, endereco: string) {
    return this.pessoaRepository.update(cpf, nome, email, telefone, endereco);
  }

  async delete(cpf: string) {
    return this.pessoaRepository.delete(cpf);
  }
}