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

	$.getJSON('Draft.json', function(data){

		// get contract artifacts
		var draftArtifact = data;
		App.contracts.Draft= TruffleContract(draftArtifact);	

		//set provider
		App.contracts.Draft.setProvider(App.web3Provider);	
	})

    return App.bindEvents();
  },

  bindEvents: function() {

    $(document).on('click', '#five', function()
	{
		var val = $('#nig').val();
		App.square(val);
	});
  console.log($('#nig').val());
  },

  square: function(s) {
	App.contracts.Draft.deployed().then(function(instance){
		draftInstance = instance;
		return draftInstance.square.call(s);
		}).then(function (r){
				console.log(r.c[0]);
		})		
  },



};


$(function() {
  $(window).load(function() {
    App.init();
  });
});
