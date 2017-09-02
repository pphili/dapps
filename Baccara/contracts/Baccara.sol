pragma solidity ^0.4.4;

contract Baccara 
{

    bool[52] public deck;
    uint public drawnCards;
    uint card;

    /*In the contructor we initialize the deck of cards. 
    Each card has a number associated, just taking them in order, hearts, diamonds, clubs, spades.
    The deck array is inialized with all false. When a card is given, the corresponding bool is set to true.
    */
    function Baccara() {
        shuffle();
    }
    
    function updateCard() public {
        address playerAddress;
        uint j;

        playerAddress = msg.sender;
        j = 0;

        while (true) {
            card = convertHashToCard(playerAddress, j); 
            j++;
            if (deck[card] == false) {
                break;
            }
        }

        drawnCards += 1;
        deck[card] = true;

        if(drawnCards == deck.length) {
            shuffle();
        }

    }

    function getCard() public returns(uint) {
        return card;
    }

    function getDeck() returns(bool[52]) {
        return deck;
    }

    function shuffle() private {
        for (uint i = 0; i < deck.length; i++) {
            deck[i] = false;
        }
        drawnCards = 0;
    }

    function total(int card1, int card2) returns(int) {
        return (card1 + card2)%10;
    }

    function convertHashToCard(address a, uint b) private returns(uint) {

        return addmod(a.balance * b, block.timestamp + b, 52);


    }
}