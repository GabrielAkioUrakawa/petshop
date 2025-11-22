export declare class CompraRepository {
    private pool;
    constructor();
    create(dataHora: string, meio: string, parcela: number, status: string, cpfCliente: string): Promise<void>;
    findAll(): Promise<any[]>;
    findById(idCompra: number): Promise<any>;
    update(idCompra: number, dataHora: string, meio: string, parcela: number, status: string, cpfCliente: string): Promise<void>;
    delete(idCompra: number): Promise<void>;
}
