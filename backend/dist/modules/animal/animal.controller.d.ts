import { AnimalService } from './animal.service';
export declare class AnimalController {
    private readonly animalService;
    constructor(animalService: AnimalService);
    findAll(): Promise<any[]>;
    findByClientCpf(clientCpf: string): Promise<any>;
    create(body: {
        clientCpf: string;
        nome: string;
        raca: string;
        especie: string;
        sexo: string;
        peso: number;
        dataNascimento: string;
    }): Promise<void>;
    update(clientCpf: string, body: {
        nome: string;
        raca: string;
        especie: string;
        sexo: string;
        peso: number;
        dataNascimento: string;
    }): Promise<void>;
    delete(clientCpf: string): Promise<void>;
}
