pragma solidity ^0.4.4;

contract Baccara 
{
    struct Player {
      //address addr;
      uint id;
      uint card1; //Could use uint[3] hand?
      uint card2;
      uint card3;
      uint result;
    }
    mapping (address => Player) players;
    uint[52] private deck;
    uint private drawnCards;

    /*In the contructor we initialize the deck of cards. 
    Each card has a number associated, just taking them in order, hearts, diamonds, clubs, spades.
    The deck array is inialized randomly.
    */
    function Baccara() {
        shuffle();
    }
    
    function updateCard() public {
        if(drawnCards == deck.length) {
            shuffle();
        }
        
        drawnCards++;       

    }

    function getCard() public returns(uint[3]) {
        return players[msg.sender].cards;//deck[drawnCards];
    }

    function updateInitialCards() public {
        if(drawnCards >= deck.length - 1) {
            shuffle();
        }
        
        drawnCards += 2;       

    }

    function getInitialCards() public returns(uint[3]) {
        uint[3] cards;
        cards[0] = deck[drawnCards];
        cards[1] = deck[drawnCards+1];
        cards[2] = total(deck[drawnCards], deck[drawnCards+1]);
        return cards;
    }

    function getDeck() returns(uint[52]) {
        return deck;
    }

    function shuffle() private {
        for (uint i = 1; i <= deck.length; i++) {
            deck[i] = i;
        }
        drawnCards = 0;
    }

    function total(uint card1, uint card2) returns(uint) {
        return (card1 + card2)%10;
    }

    function convertHashToCard(address a, uint b) private returns(uint) {

        return addmod(a.balance * b, block.timestamp + b, 52);


    }
}


