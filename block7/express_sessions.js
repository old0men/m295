const express = require("express");
const session = require("express-session");
const app = express();
const port = 3001;

app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));

app.post("/name/:name", (request, response) => {
    request.session.name = request.params.name
    response.send(request.session)
})

app.get("/name", (request, response) => {
    response.send(request.session)
})

app.delete("/name", (request, response) => {
    request.session.name = ""
    response.send(request.session)
})





app.listen(port, () => {console.log("connected to port: " + port)})