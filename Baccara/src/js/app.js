App = {

  web3Provider: null,
  contracts: {},
  card1: 0,
  card2: 0,

  init: function() {
    
    return App.initWeb3();
  },

  initWeb3: function() {

    if (typeof web3 != 'undefined')
    {
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
    }
    else
    {
  //set provider
  App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
  web3 = new Web3(App.web3Provider);
    }
    

    return App.initContract();
  },

  initContract: function() {

  $.getJSON('Baccara.json', function(data){

    // get contract artifacts
    var BaccaraArtifact = data;
    App.contracts.Baccara= TruffleContract(BaccaraArtifact);  

    //set provider
    App.contracts.Baccara.setProvider(App.web3Provider);  
  })

    return App.bindEvents();
  },

  bindEvents: function() {

    $(document).on('click', '.cardButton', function()
      {
        App.getInitialCards();
        
      });
  
  },

  getInitialCards: function() {
    
    App.contracts.Baccara.deployed().then(function(instance){
      BaccaraInstance = instance;
      return BaccaraInstance.updateInitialCards({from:web3.eth.coinbase,
        gas: 100000});
      
    }).then(function (value){
        return BaccaraInstance.getInitialCards.call();

      }).then(function(card) {
        
        var card1 = card.c[0]%13 + 1;
        var card2 = card.c[1]%13 + 1;
        var result = card.c[2];
        
        var image = 'url(images/' + card1 + '.png)';
        $('#card1').css('background', 'url(images/' + card1 + '.png)');
        $('#card1').prop('disabled',true);
        $('#card2').css('background', 'url(images/' + card2 + '.png)');
        $('#card2').prop('disabled',true);
        $('#result').html(result);
    }, function(reason) {
      console.log(reason);
    }) ;
    /*
    return BaccaraInstance.getCard.call();
    }).then(function (value){
        var card = BaccaraInstance.getCard.call();
        console.log(value);
        console.log(card);
        $('#address').html(value.c[0]);
        $('#card1').css('background', 'url(images/10-of-hearts.png)');
    }, function(reason) {
      console.log(reason);
    })    */
  },



};


$(function() {
  $(window).load(function() {
    App.init();
  });
});