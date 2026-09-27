process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// Plain CommonJS helper: package.json has no "type": "module", so `require()` is
// the only way to pull in the compiled resolvers and schema factories here.
/* eslint-disable @typescript-eslint/no-require-imports */
// Resolve the `src/*` compiler path aliases against ./dist (compiled output).
const tsconfigPaths = require('tsconfig-paths');
tsconfigPaths.register({
  baseUrl: __dirname + '/dist',
  paths: { 'src/*': ['src/*'] },
});

const fs = require('fs');
const path = require('path');
const { NestFactory } = require('@nestjs/core');
const {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  GraphQLDefinitionsFactory,
} = require('@nestjs/graphql');
const { printSchema } = require('graphql');

const resolvers = [
  require('./dist/src/auth/auth.resolver').AuthResolver,
  require('./dist/src/domain/user/user.resolver').UserResolver,
  require('./dist/src/domain/masters/masters.resolver').MastersResolver,
  require('./dist/src/domain/user/appsearch.resolver').AppSearchResolver,
  require('./dist/src/domain/reminder/reminder.resolver').ReminderResolver,
  require('./dist/src/domain/uploads/uploads.resolver').UploadsResolver,
  require('./dist/src/notification/notification.resolver').NotificationResolver,
];

async function bootstrap() {
  try {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule);
    await app.init();
    const factory = app.get(GraphQLSchemaFactory);
    const schema = await factory.create(resolvers);
    // NOTE: the runtime app writes this file with plain `printSchema` (the
    // `sortSchema` option is not enabled), so we deliberately do NOT sort here
    // to keep the checked-in artifact byte-identical to what the app produces.
    const output =
      '# ------------------------------------------------------\n' +
      '# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)\n' +
      '# ------------------------------------------------------\n\n' +
      printSchema(schema) +
      '\n';
    fs.writeFileSync(__dirname + '/src/schema.gql', output, 'utf8');
    console.log(
      'schema.gql regenerated with',
      (output.match(/type |scalar |enum |input /g) || []).length,
      'definitions',
    );
    await app.close();

    // Regenerate the TypeScript definitions companion file (src/graphql.ts).
    const definitionsFactory = new GraphQLDefinitionsFactory();
    await definitionsFactory.generate({
      typePaths: [path.join(__dirname, 'src/schema.gql')],
      path: path.join(__dirname, 'src/graphql.ts'),
      outputAs: 'interface',
      emitTypenameField: false,
      skipResolverArgs: true,
    });
    console.log('src/graphql.ts regenerated');
  } catch (error) {
    console.error('Schema generation failed:', error && error.stack);
  }
  process.exit(0);
}

setTimeout(() => {
  console.error('SCHEMA GEN TIMEOUT after 120s');
  process.exit(3);
}, 120000);

bootstrap();
