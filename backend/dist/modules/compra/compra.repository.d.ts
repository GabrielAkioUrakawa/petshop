export declare class CompraRepository {
    private pool;
    constructor();
    create(idCompra: string, dataHora: string, meio: string, parcela: number, status: string, cpfCliente: string): Promise<void>;
    findAll(): Promise<any[]>;
    findById(idCompra: string): Promise<any>;
    update(idCompra: string, dataHora: string, meio: string, parcela: number, status: string, cpfCliente: string): Promise<void>;
    delete(idCompra: string): Promise<void>;
}
