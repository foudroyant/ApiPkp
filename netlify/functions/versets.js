const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database("./matth25v6_fr.db");

const fetch=require("node-fetch")
const cheerio = require('cheerio');

const _url="https://www.philippekacou.org"
async function fetchData(url){
    const res=await fetch(url)
    const data=await res.text()
    return data
}
exports.handler= async function(event,context){ 
    const chapitre=event.queryStringParameters.chapitre
    const lng=event.queryStringParameters.lng;
    const data=await versets("https://philippekacou.org/"+lng+"/predications/predications-ecrites?NumPred="+chapitre)
    return{
        statusCode:200,
        body:JSON.stringify(data)
    } 
    
}

//Les versets du chapitre
const versets=async (link)=>{
    const liste=[]
    const fetched=await fetchData(link)
    const $ = cheerio.load(fetched);
    const details=$(".entry-details").children("p").text()
    $(".entry-body").children("p").each(function(){
        liste.push($(this).text())
    })
    return {details:details,versets:liste}
}


//Methodes sqlite3
const getVersets=(chapitre)=>{
    const promesse=new Promise((resolve, reject)=>{
        db.all("SELECT * FROM verset WHERE num_pred="+chapitre, (err, rows) => {
            //console.log(rows);
            resolve(rows)
        });
        db.close();
    })
    return promesse  
}