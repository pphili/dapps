var table = ""

document.body.style.border = "5px solid red";



if(window.location.href === "https://sister.agenziaentrate.gov.it/Visure/SceltaServizio.do?tipo=/T/TM/VCVC_") {
	document.onload = fillDataRichiestaForm();
}else if(window.location.href  === "https://sister.agenziaentrate.gov.it/Visure/DataRichiesta.do") {
	window.location = "https://sister.agenziaentrate.gov.it/Visure/SceltaLink.do?lista=EIMM&codUfficio=PI";
} else if(window.location.href === "https://sister.agenziaentrate.gov.it/Visure/SceltaLink.do?lista=EIMM&codUfficio=PI") {
	document.onload = fillElencoImmForm();
	ricercaProtocol();
} else if(window.location.href === "https://sister.agenziaentrate.gov.it/Visure/elencoImm/ElencoImm.do") {
		ricercaProtocol();	
		window.location = "https://sister.agenziaentrate.gov.it/Ispezioni/SceltaServizio.do?tipo=/T/TM/VIVI_";
} else if(window.location.href === "https://sister.agenziaentrate.gov.it/Ispezioni/SceltaServizio.do?tipo=/T/TM/VIVI_"){
	document.onload = fillVisuraForm();
}else if(window.location.href  === "https://sister.agenziaentrate.gov.it/Ispezioni/DataRichiestaPF.do") {
	window.location = "https://sister.agenziaentrate.gov.it/Ispezioni/SceltaLink.do?lista=IMM&codUfficio=PI00";
} else if(window.location.href  === "https://sister.agenziaentrate.gov.it/Ispezioni/SceltaLink.do?lista=IMM&codUfficio=PI00") {
	document.onload = fillRicercaImmForm();
}


function fillVisuraForm() {
	var select_comune = document.getElementsByName("listacom")[0];
	var richiesta_form = document.getElementsByName("DatiRichiestaPFForm")[0];
	if(select_comune) {
		console.log(select_comune);
		select_comune.value = "PI00-19960118-PISA                          ";
		richiesta_form.submit();
	}

};

function fillRicercaImmForm() {
	var elenco_form = document.getElementsByName("RicercaIMMForm")[0];
	//console.log(document.getElementsByName("denomComune")[0]);
	document.getElementsByName("denomComune")[0].value = "G702#PIPISA##";
	document.getElementsByName("tipoCatasto")[0].value = "F";
	document.getElementsByName("foglio")[0].value = "1";
	document.getElementsByName("TRASCRIZIONI")[0].checked = true;
	document.getElementsByName("ISCRIZIONI")[0].checked = false;
	document.getElementsByName("ANNOTAZIONI")[0].checked = false;

	var data_inizio = document.getElementById("dataInizio");
	var data_fine = document.getElementById("dataFine");
	data_inizio.value = "24/05/2016";
	data_fine.value = "24/05/2017";
	elenco_form.submit();
	
};


function fillDataRichiestaForm() {
	var select_comune = document.getElementsByName("listacom")[0];
	var richiesta_form = document.getElementsByName("DataRichiestaForm")[0];
	console.log(select_comune);
	if(select_comune) {
		select_comune.value = "PISA Territorio-PI";
		richiesta_form.submit();
	}

};

function fillElencoImmForm() {
	var elenco_form = document.getElementsByName("ElencoImmForm")[0];
	
	document.getElementsByName("tipoCatasto")[0].value = "F";
	document.getElementsByName("comuneCat")[0].value = "G702#PISA#0#0";
	document.getElementsByName("foglio")[0].value = "1";
	
};

function fillCategoria() {
	document.getElementsByName("partSpeciale")[0].value = "$#Tutte";
	document.getElementsByName("categoria")[0].value = "A02";
};

function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function ricercaProtocol() {
console.log("starting protocol");
	var sending = browser.runtime.sendMessage(
		  {greeting: "action_request"
	});
	sending.then(function(message) {
			console.log("Answer from background script: " + message.response);
		   	if(message.response === "selPartita"){
		   		document.getElementsByName("selPartita")[0].click();
		   	} else if(message.response === "indietro") {
		   		var elenco = document.getElementById("elencoPregeo");
		   		if(elenco != null) {
		   			console.log(elenco);
					mytable = elenco.childNodes[2].innerHTML;
				} else {
					mytable = "";
				}
		
		   		browser.runtime.sendMessage({
		   			greeting: "send_table",
				  	table: mytable
				  });
		   		document.getElementsByName("indietro")[0].click();
			} else if(message.response === "ricerca"){
				var askfoglio = browser.runtime.sendMessage(
			      {greeting: "foglio_request"
			      });
			    askfoglio.then(function(message) {
					console.log("Answer from background script: " + message.response);
				   	var myfoglio = message.response;
				   	document.getElementsByName("foglio")[0].value = myfoglio;
				   	fillCategoria(); //document.onload = 
					var ricerca_button = document.getElementsByName("ricerca")[0];
					console.log(ricerca_button);
					ricerca_button.click();
					
	    		}, handleError);
	    	}
		   	
			
	    }, handleError);  
}

/*
*/