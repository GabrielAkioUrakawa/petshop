import { AnimalService } from './animal.service';
export declare class AnimalController {
    private readonly animalService;
    constructor(animalService: AnimalService);
    findAll(): Promise<any[]>;
    findByNomeAndDonoCpf(nome: string, donoCpf: string): Promise<any>;
    create(body: {
        donoCpf: string;
        nome: string;
        raca: string;
        especie: string;
        sexo: string;
        peso: number;
        dataNascimento: string;
    }): Promise<void>;
    update(nome: string, donoCpf: string, body: {
        raca: string;
        especie: string;
        sexo: string;
        peso: number;
        dataNascimento: string;
    }): Promise<void>;
    delete(nome: string, donoCpf: string): Promise<void>;
}
