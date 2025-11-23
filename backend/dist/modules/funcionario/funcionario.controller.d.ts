import { FuncionarioService } from './funcionario.service';
export declare class FuncionarioController {
    private readonly funcionarioService;
    constructor(funcionarioService: FuncionarioService);
    findAll(): Promise<any[]>;
    findEmployeeOfTheMonth(mes: string, ano: string): Promise<any>;
    findWithServiceCount(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    create(body: {
        cpf: string;
        especialidade: string;
        nome: string;
        email?: string;
        telefone?: string;
        endereco?: string;
    }): Promise<void>;
    update(cpf: string, body: {
        especialidade?: string;
        nome?: string;
        email?: string;
        telefone?: string;
        endereco?: string;
    }): Promise<void>;
    delete(cpf: string): Promise<void>;
}
