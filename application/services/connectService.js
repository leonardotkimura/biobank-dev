// This class only work for fabric-network 1.4

const { FileSystemWallet, Gateway }  = require('fabric-network');
const path = require('path');
const fs = require('fs')

class ConnectService {
  async connectNetwork() {
    const walletPath = path.join(process.cwd(), 'fabric-details/Org1Wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const gateway = new Gateway();
    const connectionProfile = path.resolve(__dirname, '../fabric-details', 'connection.json');
    let connectionOptions = { wallet, identity: 'org1Admin', discovery: { enabled: true, asLocalhost: true }};
    await gateway.connect(connectionProfile, connectionOptions);

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('chaincode-builder');

    return { network, contract, gateway }
 }
}

module.exports = ConnectService;
