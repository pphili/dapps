App = {

  web3Provider: null,
  contracts: {},

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

	$.getJSON('Lottery.json', function(data){

		// get contract artifacts
		var draftArtifact = data;
		App.contracts.Lottery= TruffleContract(draftArtifact);	

		//set provider
		App.contracts.Lottery.setProvider(App.web3Provider);	
	})

    return App.bindEvents();
  },

  bindEvents: function() {

    //$(document).on('click', '#submit_btn', function()
	//{
		//var val = $('#guess').val();
		//App.submit(val);
	//});
  //console.log($('#guess').val());

	App.getPrice();

	

  },

  //submit: function(s) {
	//App.contracts.Lottery.deployed().then(function(instance){
		//lotteryInstance = instance;
		//return lotteryInstance.submit.call(s);
		//}).then(function (value){
			//return lotteryInstance.submit.sendTransaction("583f4f71b32721321fd0f20e674c3938142ce9f243e802c16cfc4def7d2dc523",
				//{
				//from: web3.eth.coinbase,
				//value: 1000,
				//gas: 180000
					//})
		//})		
  //},
  

		getPrice: function() {
			App.contracts.Lottery.deployed().then(function(instance){
				lotteryInstance = instance;
				return lotteryInstance.price.call()
				}).then(function (value){
					console.log(value);
							})
		  },




};


$(function() {
  $(window).load(function() {
    App.init();
  });
});
