import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { DomainModule } from './domain/domain.module';

// Use NODE_ENV to load appropriate file
// NODE_ENV=dev npm run start:dev
// NODE_ENV=prod npm run start:prod
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    DomainModule,
    AuthModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      // formatError: (error) => {
      //   return {
      //     message: error.message,
      //     extensions: {
      //       code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
      //       timestamp: new Date().toISOString(),
      //       status: error.extensions?.status || 500,
      //       path: 'GraphQL',
      //     },
      //   };
      // },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
