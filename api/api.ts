const { graphql, buildSchema } = require('graphql');

module.exports = class Api {
  graphql = async (fetch: any) => {
    const schema = buildSchema(`
      type Query {
        hello: String
      }
    `);

    const root = { hello: () => 'Hello world! 2' };

    const result = await graphql(schema, '{ hello }', root).then(
      (response: any) => {
        return response;
      }
    );
    return result;
  };
};
