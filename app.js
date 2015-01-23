var koa = require("koa");
var app = koa();

app.use(function *()  {
    this.body = "Haloa?";
});

app.listen(process.env.PORT, process.env.IP);
console.log("Server is rinning on port: " + process.env.PORT);