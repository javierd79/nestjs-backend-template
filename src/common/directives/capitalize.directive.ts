import { SchemaDirectiveVisitor } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLField } from 'graphql'

export class CapitalizeDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (...args) => {
      const result = await resolve.apply(this, args)
      if (typeof result === 'string') {
        return result[0].toUpperCase() + result.slice(1)
      }
      return result
    }
  }
}
