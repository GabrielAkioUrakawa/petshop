export declare class FuncionarioRepository {
    private pool;
    constructor();
    create(cpf: string, especialidade: string): Promise<void>;
    findAll(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    update(cpf: string, especialidade: string): Promise<void>;
    delete(cpf: string): Promise<void>;
    findWithServiceCount(): Promise<any[]>;
}
