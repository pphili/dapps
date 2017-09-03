pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Baccara.sol";

contract TestBaccara {
  Baccara baccara = Baccara(DeployedAddresses.Baccara());
    function testUserCanAdoptPet() {
      bool success = baccara.newPlayer();

     

      Assert.equal(success, true, "New player created");
    }
    
}
