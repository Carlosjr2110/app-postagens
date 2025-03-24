import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.entity';

@Module({
  imports: [
    // Configuração do TypeORM para PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // Nome do serviço no docker-compose
      port: 5432,
      username: 'admin',
      password: 'senha123',
      database: 'postagens_db',
      entities: [Post], // Entidades do TypeORM
      synchronize: true, // Cria automaticamente as tabelas (apenas para desenvolvimento)
    }),
    // Importação do módulo de posts
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
