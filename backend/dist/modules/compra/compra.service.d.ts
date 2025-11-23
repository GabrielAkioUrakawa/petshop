import { CompraRepository } from './compra.repository';
interface CreateCompraDto {
    dataHora: string;
    meio: string;
    parcela: number;
    status: string;
    cpfCliente: string;
    produtos?: Array<{
        idProduto: number;
        quantidade: number;
        precoUnitario: number;
        servicoCpf?: string;
        servicoDataHora?: string;
    }>;
}
export declare class CompraService {
    private readonly compraRepository;
    constructor(compraRepository: CompraRepository);
    create(data: CreateCompraDto): Promise<{
        id_compra: any;
    }>;
    findAll(): Promise<any[]>;
    findById(idCompra: number): Promise<any>;
    update(idCompra: number, dataHora: string, meio: string, parcela: number, status: string, cpfCliente: string): Promise<void>;
    delete(idCompra: number): Promise<void>;
    findByDateRange(dataInicio: string, dataFinal: string): Promise<any[]>;
}
export {};
