const fetch=require("node-fetch")
const cheerio = require('cheerio');

const _url="https://www.philippekacou.org"
async function fetchData(url){
    const res=await fetch(url)
    const data=await res.text()
    return data
}

//Liste des langues
const getLangues=async()=>{
    try {
        const langues=[]
        const dataf=await fetchData(_url)
        const $ = cheerio.load(dataf);

        $(".languages-list",dataf).children("li").each(function(){
            const data={
                lien:$(this).children("a").attr("href"),
                img:$(this).children("a").children("img").attr("src"),
                alt:$(this).children("a").children("img").attr("alt"),
            }
            langues.push(data)
        })
        return langues
    } catch (error) {
        console.log(error)
    }
}

exports.handler= async function(event,context){ 
    const langues=await getLangues()
    return{
        statusCode:200,
        body:JSON.stringify(langues)
    } 
    
}