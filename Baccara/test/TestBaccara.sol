pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Baccara.sol";

contract TestBaccara {
  Baccara baccara = Baccara(DeployedAddresses.Baccara());

    function testCanCreateNewPlayer() {
      bool success = baccara.newPlayer();
      Assert.equal(success, true, "New player created");
    }
    
    function testCanAddCard() {
      bool successCard = baccara.addCard();
      Assert.equal(successCard, true, "New card added");
    }
    
    function testCanGetCards() {
      uint[3] memory cards = baccara.getCards();
      Assert.equal(cards.length, 3, "Player has 3 cards");
    }
}
