/*Baccara', by Rolamichi Bamsung*/

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
    uint private deckIndex = 0;
    uint public winningTotal = 0;
    address public winningAddress;
    address public owner;
    
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    } 

    /*In the contructor we initialize the deck of cards. 
    Each card has a number associated, just taking them in order, hearts, diamonds, clubs, spades.
    The deck array is inialized randomly.
    */
    function Baccara() {
        deck = shuffle(deck);
        owner = msg.sender;
    }

    function shuffle(uint[52] _deck) private returns(uint[52]) {
        for (uint i = 0; i < _deck.length; i++) {
            uint j = convertHashToInt(msg.sender, i);
            _deck[i] = j + 1;
            _deck[j] = i + 1;
        }
        return _deck;
    }
 
    function newPlayer() public returns(bool) {
        //require(!isPlaying(msg.sender)); gonna use require after Metropolis
        if (isPlaying(msg.sender)) return false;
        players[msg.sender].isPlaying = true;
        players[msg.sender].cards = [addCard(), addCard(), 0];
        updateWinner(msg.sender);
        return true;
    }

    function deletePlayer(address addr) public onlyOwner returns(bool) {
        //require(isPlaying(addr));
        if (!isPlaying(msg.sender)) return false;
        players[addr].isPlaying = false;
        return true;
    }

    function addCard() private returns(uint) {        
        uint card = deck[deckIndex];
        deckIndex++;
        return card;
    }

    function addExtraCard() public returns(bool) {        
        //require(isPlaying(msg.sender));
        if (!isPlaying(msg.sender)) return false;
        if (players[msg.sender].cards[2] != 0) return false;
        players[msg.sender].cards[2] = addCard();
        updateWinner(msg.sender);
        return true;
    }

    function updateWinner(address addr) private {
        players[addr].total = getTotal(players[addr].cards);
        if(players[addr].total > winningTotal) {
            winningTotal = players[addr].total;
            winningAddress = addr;
        }   

    }

    function getCards() public constant returns(uint[3]) {
        //require(isPlaying(msg.sender)); 
        return players[msg.sender].cards;
    }

    function isPlaying(address addr) private constant returns(bool isIndeed) {
        return players[addr].isPlaying;
    }

    function getWinner() public constant returns(address) {
        return winningAddress;
    }

    function hasWon() public constant returns(bool) {
        return winningAddress == msg.sender;
    }

    function getTotal(uint[3] cards) public constant returns(uint) {
        uint total = 0;
        for (uint i = 0; i < 3; i++) {
            uint value = addmod(cards[i], 0, 13);
            if (value > 10) total += 10;
            else total += value;
        }
        return total%10;
    }

    function convertHashToInt(address a, uint b) private constant returns(uint) {
        //find a way to pseudorandomly initialize the deck
        return addmod((1+a.balance) * b , block.timestamp + b, 52);
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


    function getDeck() private constant returns(uint[52]) {
        return deck;
    }

    function getMyPlayer() private constant returns(Player) {
        return players[msg.sender];
    }
*/
