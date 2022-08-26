const path=require("path")
const fetch=require("node-fetch")
const cheerio = require('cheerio');


//sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./matth25v6_fr.db");

const _url="https://www.philippekacou.org"

exports.handler= async function(event,context){ 
    const lng=event.queryStringParameters.lng
    const chapitres=[]
    for(let i=1; i<5; i++){
        chapitres.push(await predications("https://www.philippekacou.org/"+lng,i))
    }
    console.log(chapitres)
    return{
        statusCode:200,
        body:JSON.stringify(chapitres)
    } 
    
}

//Fetch le site
async function fetchData(url){
    const res=await fetch(url)
    const data=await res.text()
    return data
}


//Liste des prédications
const predications=async(link,page)=>{
    const url="/predications/predications-ecrites?page="+page;
    const chapitres=[];
        const fetched=await fetchData(link+url)
        const $ = cheerio.load(fetched);
        $("tbody", fetched).children("tr").each(function(){
            const liste={
                numero:$(this).children("td").eq(0).text(),
                titre:$(this).children("td").eq(1).children("a").text(),
                lien:$(this).children("td").eq(1).children("a").attr("href")
            }
            chapitres.push(liste)
        })
        return chapitres
}


//Methodes sqlite3
const getPredications=()=>{
    const promesse=new Promise((resolve, reject)=>{
        db.all("SELECT * FROM predication", (err, rows) => {
            //console.log(rows);
            resolve(rows)
        });
        db.close();
    })
    return promesse
    
}