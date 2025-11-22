import { PessoaService } from './pessoa.service';
export declare class PessoaController {
    private readonly pessoaService;
    constructor(pessoaService: PessoaService);
    findAll(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    create(body: {
        cpf: string;
        nome: string;
        email: string;
        telefone: string;
        endereco: string;
    }): Promise<void>;
    update(cpf: string, body: {
        nome: string;
        email: string;
        telefone: string;
        endereco: string;
    }): Promise<void>;
    delete(cpf: string): Promise<void>;
}
