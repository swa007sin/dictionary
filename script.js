const searchh = async ()=>{

    let inputvalue = document.getElementById("inputfield").value;
  
    let APIURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    try{
      let apifetch= await fetch(APIURL+inputvalue);
      let convert = await apifetch.json();
      let definitions=convert[0].meanings[0].definitions;
      //calling show() after fetching data
      show(convert,definitions);
    } catch(err){
      let outputelement = document.getElementById("output");
        outputelement.innerHTML=
        `<div id="err">
        <strong>No Result Found for</strong>
         <h2>${inputvalue}</h2>
         <div/>`;
    }
  
  };
   
  //displaying data on document
  
  function show([{word,phonetics}],definitions){
    let outputelement = document.getElementById("output");
    outputelement.innerHTML=
    `<div id="cards">
    <strong id="card">Top Definition</strong>
    <strong id="card">Synonyms</strong> 
    </div>
    <div id="definition">
         <h2>${word}</h2>
         <p>/${phonetics[0].text}/</p>
         <audio controls>
           <source src=${phonetics[0].audio} type="audio/mpeg"/>
           Your browser does not support the audio element.
         </audio>
         <hr>
         <div >
         <ol>
                 <li>
                   <h5>${definitions[0].definition}</h5>
                   <p>"${definitions[0].example}"</p>
                   <p>Synonyms: ${definitions[0].synonyms[0]},${definitions[0].synonyms[1]},${definitions[0].synonyms[2]}</p>
                  </li>
                  <li>
                   <h5>${definitions[1].definition}</h5>
                   <p>"${definitions[1].example}"</p>
                   <p>Synonyms: ${definitions[1].synonyms[0]},${definitions[1].synonyms[1]},${definitions[1].synonyms[2]}</p>
                  </li>
               </ol>
         </div>
        </div>
       `;
  };
  
  //adding  keyup event
  let button = document.getElementById('inputfield').addEventListener("keyup",function(event){
    
    if(event.key=="Enter"){
      searchh();
    }
  });