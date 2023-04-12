import { Module } from '@nestjs/common';
import { GraphQLModule as GraphQL } from '@nestjs/graphql';
import { join } from 'path';

import { UpperCaseDirective } from '../../directives/uppercase.directive';
import { CapitalizeDirective } from '../../directives/capitalize.directive';

@Module({
  imports: [
    GraphQL.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: {
        origin: '*',
        credentials: true
      },
      sortSchema: true,
      schemaDirectives: {
        upperCaseDirective: UpperCaseDirective,
        capitalizeDirective: CapitalizeDirective
      },
      playground: true,
      introspection: true,
      debug: true
    })
  ],
  providers: [],
  exports: [GraphQL]
})
export class GraphQLModule {}