
//DRY function to not c&p. Gets two arguments, the search, and the already defined html
function getMinute(search, html)
{//sends a fetch, standard without any arguments a GET to the api, awaits for answer via then to translate it into a json
fetch(`http://localhost:5001/api/get?name=${search}`).then(function(answer){ 
return answer.json(); //convert the long text/string from the server into json 
}).then(function(data){ //as soon as data avaliable use acess the html 
    const el = document.querySelector(`.${html}`); 
    //and save its minutes (the json returned value) 
    el.textContent = data.minutes; 
})
}

//for later usage to do all the following functions at once
function update(){
getMinute("cs50","cs50"); 
getMinute("math", "math"); 
getMinute("","all"); 
}

update(); 

//do function update every 30sec
setInterval(update, 30000);