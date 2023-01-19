const HttpProvider = require('web3-providers-http');


// const fetch = require("node-fetch");
// var myHeaders = new fetch.Headers();
// myHeaders.append("Authorization", "Basic dTBwNjgwb3pvMDpqN3dLUHRZa0xrNnBITlNDQTlDckJaNVM3MlBFemtCSGtxbjVSVkdESGRF");
// myHeaders.append("Content-Type", "application/json");


var options = {
  'headers': {
    'Authorization': 'Basic dTBwNjgwb3pvMDpqN3dLUHRZa0xrNnBITlNDQTlDckJaNVM3MlBFemtCSGtxbjVSVkdESGRF'
  }
};


module.exports = {

  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },
    kaleido: {
      provider: new HttpProvider('https://u0anrngbym-u0kuxslxro-rpc.us0-aws.kaleido.io',options),
      gasPrice: 0,
      networkId: '*'
    }
  },

};
