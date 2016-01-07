var exp = require("express");
var app = exp();

var knex = require("knex") ({
  client: 'pg',
  connection: 'postgres://localhost/vehicles'
});

function Cars() {
  return knex('cars');
}

app.get('/', function(req, res) {
  res.redirect('/cars');
});

app.get('/cars', function(req, res) {
  Cars().select().then(function(result) {
    var content = "Cars: ";
    for (var i = 0; i < result.length; i++) {
      content += "<a href='/cars/"
      content += result[i]["id"];
      content += "'>"
      content += result[i]["make"];
      content += ' ';
      content += result[i]["model"];
      content += "</a>"
      if(i < result.length - 1)
        content += ", ";
    }
    res.send(content);
  });
});

app.get('/cars/:id', function(req, res) {
  Cars().where('id', req.params.id).first().then(function(result) {
    var content = "Car: ";
    content += result["year"];
    content += ' ';
    content += result["make"];
    content += ' ';
    content += result["model"];
    content += "<br><br>Description: ";
    content += result["description"];
    content += "<br><br><a href='/cars'>Back</a>"
    res.send(content);
  });
});

app.listen("3000", function() {
  console.log("starting server on port 3000");
});
