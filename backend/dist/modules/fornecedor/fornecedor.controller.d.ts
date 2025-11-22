import { FornecedorService } from './fornecedor.service';
export declare class FornecedorController {
    private readonly fornecedorService;
    constructor(fornecedorService: FornecedorService);
    findAll(): Promise<any[]>;
    findByCnpj(cnpj: string): Promise<any>;
    create(body: {
        cnpj: string;
        nome: string;
        email: string;
        telefone: string;
        categoria: string;
    }): Promise<void>;
    update(cnpj: string, body: {
        nome: string;
        email: string;
        telefone: string;
        categoria: string;
    }): Promise<void>;
    delete(cnpj: string): Promise<void>;
}
