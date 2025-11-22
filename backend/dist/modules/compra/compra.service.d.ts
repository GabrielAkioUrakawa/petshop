import { CompraRepository } from './compra.repository';
export declare class CompraService {
    private readonly compraRepository;
    constructor(compraRepository: CompraRepository);
    create(idCompra: string, dataHora: string, meio: string, parcela: number, status: string, cpfCliente: string): Promise<void>;
    findAll(): Promise<any[]>;
    findById(idCompra: string): Promise<any>;
    update(idCompra: string, dataHora: string, meio: string, parcela: number, status: string, cpfCliente: string): Promise<void>;
    delete(idCompra: string): Promise<void>;
}
