var Blockemon = artifacts.require("./Blockemon.sol");

module.exports = function(deployer){
    deployer.deploy(Blockemon);
};