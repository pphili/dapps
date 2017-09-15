


function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +
    request.greeting);
  if(request.greeting === "send_table" ) {
  	tables.push(request.table);
  } else if(request.greeting === "action_request" ){
  		if(active_foglio >= max_foglio) {      	
	        sendResponse({response: "stop"});
	  } else {
  		sendResponse({response: actions[action_state]});
  		action_state += 1;
  		action_state %= actions.length;
  		}

  		

  } else if(request.greeting === "foglio_request" ){
      sendResponse({response: active_foglio});
	  active_foglio += 1;
  } else if(request.greeting === "popup_request" ){
  		sendResponse({response: tables});
  } else if(request.greeting === "date_request" ){
      sendResponse({response: data_inizio});
  }
  
};


var tables = [];
var active_foglio = 1;
var max_foglio = 6;
var categoria_catastale = "A02";
var action_state = 0;
var data_inizio = "24/05/2016";
var data_fine = "24/05/2017"; 
var actions = ["selPartita", "ricerca", "indietro"];
browser.runtime.onMessage.addListener(handleMessage);


//https://sister.agenziaentrate.gov.it/Ispezioni/iimm/EsitoAnteprimaImm.do