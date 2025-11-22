import { FuncionarioService } from './funcionario.service';
export declare class FuncionarioController {
    private readonly funcionarioService;
    constructor(funcionarioService: FuncionarioService);
    findAll(): Promise<any[]>;
    findWithServiceCount(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    create(body: {
        cpf: string;
        especialidade: string;
    }): Promise<void>;
    update(cpf: string, body: {
        especialidade: string;
    }): Promise<void>;
    delete(cpf: string): Promise<void>;
}
