import { FuncionarioRepository } from './funcionario.repository';
export declare class FuncionarioService {
    private readonly funcionarioRepository;
    constructor(funcionarioRepository: FuncionarioRepository);
    create(cpf: string, especialidade: string): Promise<void>;
    findAll(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    update(cpf: string, especialidade: string): Promise<void>;
    delete(cpf: string): Promise<void>;
    findWithServiceCount(): Promise<any[]>;
    findEmployeeOfTheMonth(mes: number, ano: number): Promise<any>;
}
