/*Blockemon', by Rolamichi Bamsung
Each Blockemon is a contract that inherits from the general Blockemon contract.



*/

pragma solidity ^0.4.4;

contract Blockemon 
{

    struct Player {
      string name;
      Block[] Blockedex;
      bool isPlaying = false;
    }


    struct Block {
      string name;
      uint power;
      uint defense;
      uint special;
      uint speed;
      uint HP;
      uint SP;
    }

    mapping (address => Player) players;
    mapping (address => Block) blocks;
    address owner;
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    } 

    function Blockemon() {
       owner = msg.sender;
    }
 
    function newPlayer(string name) public returns(bool) {
        //require(!isPlaying(msg.sender)); gonna use require after Metropolis
        if (isPlaying(msg.sender)) return false;
        players[msg.sender].isPlaying = true;
        players[msg.sender].name = name;
        return true;
    }

    function deletePlayer(address addr) public returns(bool) {
        //require(isPlaying(addr));
        if (!isPlaying(addr) || msg.sender != owner) return false;
        players[addr].isPlaying = false;
        return true;
    }

    function getBlock(uint index) public constant returns(string, uint, uint, uint, uint, uint, uint) {
        require(isPlaying(msg.sender)); 
        require(index < players[msg.sender].blocks.length);
        Block b = players[msg.sender].blocks[index];
        return (b.name, b.power, b.defense, b.special, b.speed, b.HP, b.SP);
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


contract Blockemon {
  uint

}