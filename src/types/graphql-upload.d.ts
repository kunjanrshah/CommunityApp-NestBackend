declare module 'graphql-upload' {
  import { GraphQLScalarType } from 'graphql';
  export const graphqlUploadExpress: (...args: unknown[]) => unknown;
  export const graphqlUploadKoa: (...args: unknown[]) => unknown;
  export const GraphQLUpload: GraphQLScalarType;
  export const processRequest: (...args: unknown[]) => unknown;
  export const Upload: unknown;
}
