pragma solidity ^0.4.4;

contract Baccara 
{
    struct Player {
      uint[3] cards;
      uint total;
      bool isPlaying;
    }
    mapping (address => Player) players;
    
    uint[52] private deck;
    uint private deckIndex;
    uint public winningTotal;
    address public winningAddress;
    
        
    /*In the contructor we initialize the deck of cards. 
    Each card has a number associated, just taking them in order, hearts, diamonds, clubs, spades.
    The deck array is inialized randomly.
    */
    function Baccara() {
        shuffle();
        winningTotal = 0;
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
        players[msg.sender].total = 0;
        for (uint i = 0; i < players[msg.sender].cards.length; i++) {
            players[msg.sender].cards[i] = 0;
        }
        return true;
    }

    function deletePlayer(address addr) private returns(bool success) {
        require(isPlaying(addr));
        players[addr].isPlaying = false;
        return true;
    }

    function addCard() public returns(bool success) {        
        require(isPlaying(msg.sender));
        for (uint i = 0; i < players[msg.sender].cards.length; i++) {
            if(players[msg.sender].cards[i] == 0) {
                players[msg.sender].cards[i] = deck[deckIndex];
                deckIndex++;
            }
        }
        uint pTotal = getTotal(players[msg.sender].cards);
        players[msg.sender].total = pTotal;
        if(pTotal > winningTotal) {
            winningTotal = pTotal;
            winningAddress = msg.sender;
        }
        return true;
    }

    function getCards() public returns(uint[3]) {
        uint[3] memory cards = players[msg.sender].cards;
        return cards;
    }

    function getMyPlayer() private returns(Player) {
        return players[msg.sender];
    }

    function isPlaying(address addr) private constant returns(bool isIndeed) {
        return players[addr].isPlaying;
    }

    function getWinner() public returns(address) {
        return winningAddress;
    }

    function getDeck() private returns(uint[52]) {
        return deck;
    }

    function getTotal(uint[3] cards) public returns(uint) {
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
      uint total;
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