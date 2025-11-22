import { PessoaRepository } from './pessoa.repository';
export declare class PessoaService {
    private readonly pessoaRepository;
    constructor(pessoaRepository: PessoaRepository);
    create(cpf: string, nome: string, email: string, telefone: string, endereco: string): Promise<void>;
    findAll(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    update(cpf: string, nome: string, email: string, telefone: string, endereco: string): Promise<void>;
    delete(cpf: string): Promise<void>;
}
