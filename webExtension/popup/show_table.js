

/*
Listen for clicks in the popup.

If the click is on one of the beasts:
  Inject the "beastify.js" content script in the active tab.

  Then get the active tab and send "beastify.js" a message
  containing the URL to the chosen beast's image.

If it's on a button which contains class "clear":
  Reload the page.
  Close the popup. This is needed, as the content script malfunctions after page reloads.
*/

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("activate")) {
    var clickedButton = e.target.textContent;
    var tabdiv = document.getElementsByName("tabella")[0];
    
    
    var sending = browser.runtime.sendMessage(
      {greeting: "popup_request"
      });
    sending.then(handleResponse , handleError);  



function handleResponse(message) {
      console.log("Answer from background script: ");
      if(message.response) {
        var tables = message.response;
        console.log(tables.length);
        for (var i = 0; i < tables.length; i++) {
          tabdiv.innerHTML += tables[i];            
        }
      }
}

function handleError(error) {
  console.log(`Error: ${error}`);
}


/*

    browser.tabs.executeScript(null, { 
     file: "/content_scripts/tablify.js" 
  });

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
    	console.log(tabs[0]);
      browser.tabs.sendMessage(tabs[0].id, {table: "fava"});
    });
	console.log(clickedButton, window.location.href);
    
    // Open a new tab in a new window and make it active.
  var creating = browser.tabs.create(
	   {active:true,
	  url: "/content_html/myTable.html"
	   }
	);

  var para = document.createElement("P");                       // Create a <p> element
	var t = document.createTextNode("This is a paragraph");       // Create a text node
	para.appendChild(t);                                          // Append the text to <p>
	document.body.appendChild(para); 
  //window.close();
  
  browser.tabs.executeScript(null, { 
     file: "/content_scripts/tablify.js" 
  });

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
    	console.log(tabs[0]);
      browser.tabs.sendMessage(tabs[0].id, {table: "fava"});
    });
    */
  }
  //else if (e.target.classList.contains("clear")) {
  //console.log("clear");
  //  browser.tabs.reload();
   // window.close();
  //}
});



