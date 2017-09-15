pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Blockemon.sol";

contract TestBlockemon {
  Blockemon blockemon = Blockemon(DeployedAddresses.Blockemon());

    function testCanCreateNewPlayer() {
      bool success = blockemon.newPlayer();
      Assert.equal(success, true, "New player created");
    }
    
    function testCanAddCard() {
      bool successCard = blockemon.addCard();
      Assert.equal(successCard, true, "New card added");
    }

    function testCanGetCards() {
      blockemon.addCard();
      blockemon.addCard();
      uint[3] memory cards = blockemon.getCards();
      uint nCards = 0;
      for (uint i =0; i < cards.length; i++) {
        if (cards[i] != 0) {
            nCards++;
        }
      }
      Assert.equal(nCards, 3, "Player has 3 cards");
    }

    function testCanGetTotal() {
      uint[3] memory myCards;
      //uint[3] memory cards = blockemon.getCards();
      myCards[0] = 8;
      myCards[1] = 15;
      myCards[2] = 11;
      uint total = blockemon.getTotal(myCards);
      Assert.equal(total, 8, "Total is 8");
    }
}
