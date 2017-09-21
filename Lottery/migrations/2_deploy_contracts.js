var lottery = artifacts.require("./Lottery.sol");

module.exports = function(deployer){
	deployer.deploy(lottery, 100, 100, "583f4f71b32721321fd0f20e674c3938142ce9f243e802c16cfc4def7d2dc523", 1000)
};
