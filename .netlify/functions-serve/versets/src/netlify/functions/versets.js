// netlify/functions/versets.js
var sqlite3 = require("sqlite3").verbose();
var path = require("path");
var db = new sqlite3.Database(path.join(__dirname, "../../matth25v6_fr.db"));
exports.handler = async function(event, context) {
  const chapitre = event.queryStringParameters.chapitre;
  const data = getVersets(chapitre || 1).then((res) => {
    return res;
  });
  return {
    statusCode: 200,
    body: JSON.stringify(await data)
  };
};
var getVersets = (chapitre) => {
  const promesse = new Promise((resolve, reject) => {
    db.all("SELECT * FROM verset WHERE num_pred=" + chapitre, (err, rows) => {
      resolve(rows);
    });
    db.close();
  });
  return promesse;
};
//# sourceMappingURL=versets.js.map
