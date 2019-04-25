import express=require("express");

const app: express.Application = express();
// view engine setup
app.set("views", "views");
app.set("view engine", "ejs");

//server
app.listen(3000);

