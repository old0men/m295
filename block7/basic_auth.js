const express = require("express");
const session = require("express-session")
const app = express()
const port = 3001;

app.use(express.urlencoded({extended:true}))


app.get("/public", (request, response) => {
    response.send("you got in because this is public")
})

let user_db = [
    {
        username: "zli",
        password: "zli234"
    }
]

app.get("/private", (request, response) => {
    if (user_db.find((user) =>
        user.password === request.body.password &&
        user.username === request.body.username)
    ) {
        response.send("thank you for logging in")
    } else {
        response.status(401)
            .send("you either don't have an account or wrong credentials")
    }
})

app.post("/private/sign_up", (request, response) => {
    
})

app.listen (port, () => {console.log("connected to port: " + port)})