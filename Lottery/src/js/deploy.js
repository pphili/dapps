var _duration = 100/* var of type uint256 here */ ;
var _revealDuration = 100 /* var of type uint256 here */ ;
var _nHashed = sha3_256("120")/* var of type bytes32 here */ ;
var browser_modulo_sol_moduloContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"getWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"num","type":"uint256"}],"name":"reveal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"nHashed","type":"bytes32"}],"name":"submit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nums","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_duration","type":"uint256"},{"name":"_revealDuration","type":"uint256"},{"name":"_nHashed","type":"bytes32"}],"payable":true,"stateMutability":"payable","type":"constructor"}]);
var browser_modulo_sol_modulo = browser_modulo_sol_moduloContract.new(
   _duration,
   _revealDuration,
   _nHashed,
   {
     from: web3.eth.accounts[0], 
     data: '0x60606040526040516060806105d8833981016040528080519060200190919080519060200190919080519060200190919050505b82600481905550816006819055504260058190555034600181905550806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081600019169055505b5050505b61052e806100aa6000396000f30060606040523615610076576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680638e7ea5b21461007b578063a035b1fe14610090578063c2ca0ac5146100b9578063d9caa3d2146100dc578063f71d96cb146100f8578063fd1ee54c1461015b575b600080fd5b341561008657600080fd5b61008e610192565b005b341561009b57600080fd5b6100a3610286565b6040518082815260200191505060405180910390f35b34156100c457600080fd5b6100da600480803590602001909190505061028c565b005b6100f66004808035600019169060200190919050506103b0565b005b341561010357600080fd5b6101196004808035906020019091905050610420565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561016657600080fd5b61017c6004808035906020019091905050610460565b6040518082815260200191505060405180910390f35b6000806000600654600454600554010142101515156101b057600080fd5b6002805490509150600090505b818110156101f6576002818154811015156101d457fe5b906000526020600020900160005b5054830192505b80806001019150506101bd565b6003828481151561020357fe5b0681548110151561021057fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc83600154029081150290604051600060405180830381858888f19350505050151561028057600080fd5b5b505050565b60015481565b4260045460055401101515156102a157600080fd5b600654600454600554010142111515156102ba57600080fd5b80604051808281526020019150506040518091039020600019166000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546000191614156103ac57600280548060010182816103319190610485565b916000526020600020900160005b83909190915055506003805480600101828161035b91906104b1565b916000526020600020900160005b33909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b5b50565b6004546005540142111515156103c557600080fd5b600154341415156103d557600080fd5b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081600019169055505b50565b60038181548110151561042f57fe5b906000526020600020900160005b915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60028181548110151561046f57fe5b906000526020600020900160005b915090505481565b8154818355818115116104ac578183600052602060002091820191016104ab91906104dd565b5b505050565b8154818355818115116104d8578183600052602060002091820191016104d791906104dd565b5b505050565b6104ff91905b808211156104fb5760008160009055506001016104e3565b5090565b905600a165627a7a723058201b983d0fbc15d6f3c2de33d10c290ebd2225c23bbe3e882ed548a76f813ea8340029', 
     gas: '4689378'
   
     }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    
    }
 
     }
		)