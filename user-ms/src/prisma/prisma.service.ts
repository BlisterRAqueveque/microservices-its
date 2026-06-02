import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { envs } from 'src/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private pool: Pool;

  constructor() {
    // 1. Initialize the native pg connection pool
    const pool = new Pool({
      connectionString: envs.DATABASE_USER,
    });

    // 2. Instantiate the Prisma PostgreSQL adapter
    const adapter = new PrismaPg(pool);

    // 3. Pass the adapter straight to the PrismaClient constructor
    super({ adapter });
    this.pool = pool;
  }

  async onModuleInit() {
    // Connects to the database when the module initializes
    await this.$connect();
  }

  async onModuleDestroy() {
    // Gracefully disconnects and shuts down pool on app shutdown
    await this.$disconnect();
    await this.pool.end();
  }
}
