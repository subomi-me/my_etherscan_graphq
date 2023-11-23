// Import necessary module for making REST API requests
const { RESTDataSource } = require("apollo-datasource-rest");

// Vitalik's Ethereum Address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Etherscan Data Source Class
class EtherDataSource extends RESTDataSource {
  // Constructor setting the base URL for Etherscan API
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api";
  }

  // Retrieve Ethereum balance by address using Etherscan API
  async etherBalanceByAddress() {
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Retrieve total supply of Ether using Etherscan API
  async totalSupplyOfEther() {
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Get the latest Ethereum price using Etherscan API
  async getLatestEthereumPrice() {
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Get estimated block confirmation time using Etherscan API
  async getBlockConfirmationTime() {
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

// Export the EtherDataSource class for external use
module.exports = EtherDataSource;
