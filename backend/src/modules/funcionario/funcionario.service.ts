import { Injectable } from '@nestjs/common';
import { FuncionarioRepository } from './funcionario.repository';

@Injectable()
export class FuncionarioService {
  constructor(private readonly funcionarioRepository: FuncionarioRepository) {}

  async create(cpf: string, especialidade: string) {
    return this.funcionarioRepository.create(cpf, especialidade);
  }

  async findAll() {
    return this.funcionarioRepository.findAll();
  }

  async findByCpf(cpf: string) {
    return this.funcionarioRepository.findByCpf(cpf);
  }

  async update(cpf: string, especialidade: string) {
    return this.funcionarioRepository.update(cpf, especialidade);
  }

  async delete(cpf: string) {
    return this.funcionarioRepository.delete(cpf);
  }

  async findWithServiceCount() {
    return this.funcionarioRepository.findWithServiceCount();
  }
}