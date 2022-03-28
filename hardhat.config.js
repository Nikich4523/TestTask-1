require("@nomiclabs/hardhat-waffle");
require('solidity-coverage');
require('dotenv').config();

const donate = require("./tasks/donate");
const withdraw = require("./tasks/withdraw");
const donatersList = require("./tasks/donatersList");
const getSumOfDonates = require("./tasks/getSumOfDonates");
const balance = require("./tasks/balance");

// KEYS
const ALCHEMY_API_KEY = process.env.ALCHEMY;
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY;

// TASKS
donate();
withdraw();
donatersList();
getSumOfDonates();
balance();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`]
    }
  }
};