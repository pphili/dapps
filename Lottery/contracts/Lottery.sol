pragma solidity ^0.4.0;

contract Lottery{
    
    mapping (address => bytes32) tickets;
    
    uint public price;
    
    uint [] public nums;
    address [] public players;
    
    
    uint playDuration;
    uint startTime;
    
    uint revealDuration;
    
    // contract constructor.
    function Lottery(uint _duration, uint _revealDuration, bytes32 _nHashed, uint _price) {
        playDuration = _duration;
        revealDuration = _revealDuration;
        startTime = now;
        price = _price;
        
       tickets[msg.sender] = _nHashed;
        
    
    }
    
    function reveal(uint num){
        require (startTime + playDuration >= now);
        require(now <= startTime + playDuration + revealDuration);
        
        
	if (tickets[msg.sender] == keccak256(num)){
            nums.push(num);    
            players.push(msg.sender);
        
	}
    
    }

    // take a guess and a payment
    
    function submit(bytes32 nHashed) payable{
        
        require (now <= (startTime + playDuration));

        require(msg.value == price);
        
        tickets[msg.sender] = nHashed;
        
    
    }
    
    function getWinner(){
        require (now >= startTime + playDuration + revealDuration);
        
        uint nSum;
        uint N = nums.length;
        
	for (uint i = 0; i < N; i++){
            nSum += nums[i];
        
	}
        players[nSum % N].transfer(price * N);
        
    
    }
    

}
