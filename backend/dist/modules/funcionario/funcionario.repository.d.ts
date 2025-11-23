export declare class FuncionarioRepository {
    private pool;
    constructor();
    create(data: {
        cpf: string;
        especialidade: string;
        nome: string;
        email?: string;
        telefone?: string;
        endereco?: string;
    }): Promise<void>;
    findAll(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    update(cpf: string, data: {
        especialidade?: string;
        nome?: string;
        email?: string;
        telefone?: string;
        endereco?: string;
    }): Promise<void>;
    delete(cpf: string): Promise<void>;
    findWithServiceCount(): Promise<any[]>;
    findEmployeeOfTheMonth(mes: number, ano: number): Promise<any>;
}
