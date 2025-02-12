import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

const options = {
    log: [
      { emit: 'event', level: 'query' } as const,
      { emit: 'event', level: 'info' } as const,
      { emit: 'event', level: 'warn' } as const,
      { emit: 'event', level: 'error' } as const
    ],
    errorFormat: process.env.NODE_ENV === 'production' ? ('minimal' as const) : ('pretty' as const)
  };

@Injectable()
export class PrismaService extends PrismaClient<typeof options> implements OnModuleInit {
    
    private readonly _logger = new Logger(PrismaService.name);

    public constructor() {
      super(options);
  
      this.$on('query', (e: Prisma.QueryEvent) => {
        this._logger.log(e.query);
      });
      this.$on('info', (e: Prisma.LogEvent) => {
        this._logger.log(e.message);
      });
      this.$on('warn', (e: Prisma.LogEvent) => {
        this._logger.warn(e.message);
      });
      this.$on('error', (e: Prisma.LogEvent) => {
        this._logger.error(e.message);
      });
    }
  
    async onModuleInit() {
        await this.$connect();
    }
    
    async enableShutdownHooks(app:INestApplication) {
        process.on('beforeExit', async () => {
            await this.$disconnect();
            await app.close();
        });
    }
}
