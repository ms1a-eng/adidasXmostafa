const allowedSites = ["cs50", "ombplus", "ocw.mit.edu", "vorkurs.mathematik.tu-darmstadt"]; 
console.table(allowedSites); 

//chrome filters 
filter =  {"active": true, "currentWindow": true}; 

//Every 1min
const timer = chrome.alarms.create("timer", {"periodInMinutes": 1});
console.log(`tiemr set on: ${timer}\n`);

//check operation on alarm
chrome.alarms.onAlarm.addListener(function(alarms){
    console.log(`in the Listener! found ${alarms.name}\n`)
    
    //check the current tabs
    chrome.tabs.query(filter, function(tabs){
            console.log("site is: ", tabs[0]); 
            const currenttab = tabs[0];
            if(!currenttab) return;  
            for (const site of allowedSites)
                {
                    if (currenttab.url.includes(site))
                    {
                        console.log(`current tab check: ${currenttab["url"]}\n site is: ${site} `);
                        fetch(
                            "http://localhost:5001/api/save" ,{
                                "method": "POST", 
                                "headers": {
                                    "Content-Type": "application/json",
                                    "API-KEY": "adiXm05",  
                                },
                                "body": JSON.stringify(currenttab)
                            }
                            ); 
                        return true; 
                    }
                } 
    });
});







