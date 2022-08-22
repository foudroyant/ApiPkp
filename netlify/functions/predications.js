var path = require('path');
const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database(path.join(__dirname,"../../matth25v6_fr.db"));
const db = new sqlite3.Database("./matth25v6_fr.db");

exports.handler= async function(event,context){ 
    //console.log(path.join(__dirname,"../../matth25v6_fr.db"))
    const data=getPredications().then(res=>{
        return res 
    })
    
    return{
        statusCode:200,
        body:JSON.stringify(await data)
    } 
    
}

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