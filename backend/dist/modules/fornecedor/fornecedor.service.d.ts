import { FornecedorRepository } from './fornecedor.repository';
export declare class FornecedorService {
    private readonly fornecedorRepository;
    constructor(fornecedorRepository: FornecedorRepository);
    create(cnpj: string, nome: string, email: string, telefone: string, categoria: string): Promise<void>;
    findAll(): Promise<any[]>;
    findByCnpj(cnpj: string): Promise<any>;
    update(cnpj: string, nome: string, email: string, telefone: string, categoria: string): Promise<void>;
    delete(cnpj: string): Promise<void>;
}
