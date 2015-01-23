var koa = require("koa");
var app = koa();

var route = require("koa-route");
var parse = require("co-body");
var monk = require("monk");
var wrap = require("co-monk");
var db = monk(process.env.IP+"/koa_users");
var users = wrap(db.get("users"));

app.use(route.post("/user", saveUser));
app.use(route.get("/user/:id", getUser));

function *saveUser(){
    //parse user from the incoming request
    var userFromRequest = yield parse(this);
    
    //save user into the database
    var user = yield users.insert(userFromRequest);
    
    //return status and resource
    this.body = user;
    this.set("Location", "/users/"+user._id);
    this.status = 201;
}

function *getUser(id){
    var user = yield users.findById(id);
    
    this.body = user;
    this.status = 200;
}
app.listen(process.env.PORT, process.env.IP);
console.log("Server is rinning on port: " + process.env.PORT);