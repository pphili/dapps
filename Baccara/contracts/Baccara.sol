pragma solidity ^0.4.4;

contract Baccara 
{
    struct Player {
      uint[] cards;
      uint result;
      bool isPlaying;
    }
    mapping (address => Player) players;
    
    uint[52] private deck;
    uint private deckIndex;
    address public winningAddress;
    
        
    /*In the contructor we initialize the deck of cards. 
    Each card has a number associated, just taking them in order, hearts, diamonds, clubs, spades.
    The deck array is inialized randomly.
    */
    function Baccara() {
        shuffle();
    }

    function shuffle() private {
        for (uint i = 0; i < deck.length; i++) {
            uint j = convertHashToInt(msg.sender, i);
            deck[i] = j + 1;
            deck[j] = i + 1;
        }
        deckIndex = 0;
    }
 
    function newPlayer() public returns(bool success) {
        require(!isPlaying(msg.sender)); 
        players[msg.sender].isPlaying = true;
        players[msg.sender].result = 0;
        return true;
    }

    function deletePlayer(address addr) private returns(bool success) {
        require(isPlaying(addr));
        players[addr].isPlaying = false;
        return true;
    }

    function addCard() public returns(bool success) {        
        require(isPlaying(msg.sender));
        if (players[msg.sender].cards.length <=3) {
            players[msg.sender].cards.push(deck[deckIndex]);
            deckIndex++;
        }
        return true;
    }

    function getCards() private returns(uint[]) {
        return players[msg.sender].cards;
    }

    function getMyPlayer() private returns(Player) {
        return players[msg.sender];
    }

    function isPlaying(address addr) private constant returns(bool isIndeed) {
        return players[addr].isPlaying;
    }

    function getWinner() returns(address) {
        return winningAddress;
    }

    function getDeck() private returns(uint[52]) {
        return deck;
    }

    function getTotal(uint[] cards) public returns(uint) {
        uint total = 0;
        for (uint i = 0; i < cards.length; i++) {
            if (cards[i] > 10) total += 10;
            else total += cards[i];
        }
        return total%10;
    }

    function convertHashToInt(address a, uint b) private returns(uint) {
        //find a way to pseudorandomly initialize the deck
        return addmod(a.balance * b, block.timestamp + b, 52);
    }
}


/*
Other possibility for data struct. 
struct Player {
      //address addr;
      address addr;
      uint card1; //Could use uint[3] hand?
      uint card2;
      uint card3;
      uint result;
      bool isPlaying;
    }
    Player[] private players;


function newPlayer(address addr, uint entityData) public returns(uint rowNumber) {
            Player memory newPlayer;
            newPlayer.addr = addr;
            newPlayer.entityData  = entityData;
            return players.push(newPlayer)-1;
        }

        function getPlayerCount() public constant returns(uint entityCount) {
            return players.length;
        }
*/