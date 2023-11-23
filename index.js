const { ApolloServer } = require("apollo-server"); // Import the Apollo Server library

const { importSchema } = require("graphql-import"); // Import graphql-import to load schema files

const EtherDataSource = require("./datasource/ethDatasource"); // Import custom data source for Ethereum data

require("dotenv").config(); // Load environment variables from .env file

// Define resolvers for GraphQL queries
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Resolver to get ether balance for an address
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Resolver to get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Resolver to get latest ETH price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Resolver to get average block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create an Apollo Server instance with type definitions, resolvers, and data sources
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Instantiate the EtherDataSource
  }),
});

// Set the server timeout to 0 to disable automatic timeouts
server.timeout = 0;

// Start the Apollo Server on port 9000 and log the server's URL
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
