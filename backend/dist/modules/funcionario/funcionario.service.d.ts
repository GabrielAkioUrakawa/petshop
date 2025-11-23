import { FuncionarioRepository } from './funcionario.repository';
interface CreateFuncionarioDto {
    cpf: string;
    especialidade: string;
    nome: string;
    email?: string;
    telefone?: string;
    endereco?: string;
}
interface UpdateFuncionarioDto {
    especialidade?: string;
    nome?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
}
export declare class FuncionarioService {
    private readonly funcionarioRepository;
    constructor(funcionarioRepository: FuncionarioRepository);
    create(data: CreateFuncionarioDto): Promise<void>;
    findAll(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    update(cpf: string, data: UpdateFuncionarioDto): Promise<void>;
    delete(cpf: string): Promise<void>;
    findWithServiceCount(): Promise<any[]>;
    findEmployeeOfTheMonth(mes: number, ano: number): Promise<any>;
}
export {};
