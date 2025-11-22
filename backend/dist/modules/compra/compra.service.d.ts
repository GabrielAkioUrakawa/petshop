import { CompraRepository } from './compra.repository';
export declare class CompraService {
    private readonly compraRepository;
    constructor(compraRepository: CompraRepository);
    create(dataHora: string, meio: string, parcela: number, status: string, cpfCliente: string): Promise<void>;
    findAll(): Promise<any[]>;
    findById(idCompra: number): Promise<any>;
    update(idCompra: number, dataHora: string, meio: string, parcela: number, status: string, cpfCliente: string): Promise<void>;
    delete(idCompra: number): Promise<void>;
    findByDateRange(dataInicio: string, dataFinal: string): Promise<any[]>;
}
