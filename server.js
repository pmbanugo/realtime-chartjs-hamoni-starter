var express = require("express");
var bodyParser = require("body-parser");
var Hamoni = require("hamoni-sync");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let voteData = [
  { candidate: "Peter Mbanugo", vote: 0 },
  { candidate: "Angela Daniels", vote: 0 },
  { candidate: "Rose Philly", vote: 0 },
  { candidate: "James Crump", vote: 0 }
];

let statePrimitive;

app.post("/vote", function(req, res) {
  var voterId = req.body.voterId;
  var candidate = req.body.candidate;

  //TODO: save vote to a database

  //Update vote chart state
  voteData.forEach(data => {
    if (data.candidate === candidate) data.vote = data.vote + 1;
  });

  res.sendStatus(201);
});

app.use(express.static(__dirname + "/public"));

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});

let hamoni = new Hamoni("ACCOUNT_ID", "APP_ID");
