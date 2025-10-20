import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraficaModule } from './modules/grafica/grafica.module';
import { ImpressaoModule } from './modules/impressao/impressao.module';
import { LivroModule } from './modules/livro/livro.module';

@Module({
  imports: [
    GraficaModule, 
    ImpressaoModule, 
    LivroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
