//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "sjbasdfbasdbfhasbdlfkabsdljhbsadhblaasdasdkfcbsakjdbclkasbckasbdclkabskcljabslkcbaskjcbkasbckasjbcks";
const gpaContent = "Your GPA is: 4.00/4.00";
const weekContent = "sdasdknckajsncjanskcnaskjcnka;sdnc;kasn;kansfkvjankjvnkjnv;kdsnvj;dfnsjvd;knvsdkv;ksdfnvdsnv;kdnsvdsnf;vksdkvdkvdsv";
const todoContent = "Here is my to-do list";
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));




// var rows = 24;
// var columns = 7;
//
// var [r, c] = [rows, columns];
// var filledArray = Array(r).fill().map(() => Array(c).fill(0));
//
//
// function createTable(tableData) {
//   var table = document.createElement('table');
//   var tableBody = document.createElement('tbody');
//
//   tableData.forEach(function(rowData) {
//     var row = document.createElement('tr');
//
//     rowData.forEach(function(cellData) {
//       var cell = document.createElement('td');
//       cell.appendChild(document.createTextNode(cellData));
//       row.appendChild(cell);
//     });
//
//     tableBody.appendChild(row);
//   });
//
//   table.appendChild(tableBody);
//   document.body.appendChild(table);
// }
//
// var weekTable = createTable(filledArray);









let events = [];
let posts = [];

app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    events: events
  });
});

app.get("/weekView", function(req, res) {
  res.render("weekView", {
    events: events
  });
});

app.get("/todoList", function(req, res) {
  res.render("todoList", {
    todoContent: todoContent
  });
});

app.get("/gpaCalculator", function(req, res) {
  res.render("gpaCalculator", {
    gpaContent: gpaContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose", {
    posts: posts
  });
  //
  // posts.push(post);
  // //
  // res.redirect("/");

});

app.post("/compose", function(req, res) {
  const event = {
    title: req.body.eventTitle,
    content: req.body.eventBody
  };

  events.push(event);

  res.redirect("/");

});

app.post("/compose", function(req, res) {
  const post = {
    pTitle: req.body.postTitle,
    pContent: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});


app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
