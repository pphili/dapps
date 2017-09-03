App = {

  web3Provider: null,
  contracts: {},
  card1: 0,
  card2: 0,

  init: function() {
    
    return App.initWeb3();
  },

  initWeb3: function() {

    if (typeof web3 != 'undefined') {
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
    } else {
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
    $(document).on('click', '#sitButton', function() {
        App.sit($(this));
    });

    $(document).on('click', '.cardButton', function() {
        App.addCard($(this));
    });
  
  },

  sit: function(button) {
    App.contracts.Baccara.deployed().then(function(instance){
      BaccaraInstance = instance;
      return BaccaraInstance.newPlayer({from:web3.eth.coinbase,
        gas: 100000});
      
    }).then(function (value){
        button.prop('disabled',true);
        button.hide();
        $('.cardButton').show();
        $('.cardButton').prop('disabled',false);
      })

  },
  addCard: function(button) {
    
    App.contracts.Baccara.deployed().then(function(instance){
      BaccaraInstance = instance;
      return BaccaraInstance.addCard({from:web3.eth.coinbase,
        gas: 100000});
      
    }).then(function (value){
        return BaccaraInstance.getCards.call();

      }).then(function(cards) {
        
        var card = cards[0]%13 + 1;
        var total = BaccaraInstance.getTotal(cards);
        
        var image = 'url(images/' + card + '.png)';
        button.css('background', image);
        button.prop('disabled',true);
        $('#total').html(total);

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