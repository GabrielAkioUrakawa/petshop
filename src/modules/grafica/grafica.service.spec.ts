import { Test, TestingModule } from '@nestjs/testing';
import { GraficaService } from './grafica.service';

describe('GraficaService', () => {
  let service: GraficaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraficaService],
    }).compile();

    service = module.get<GraficaService>(GraficaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
