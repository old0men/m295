const express = require('express');
const app = express();
const port = 3001;

app.get('/now', (request, response) => {
    let time = Date.now();
    response.send(time/60000 + " minuets");
});

app.get("/zli", (request, response) => {
    response.redirect("https://www.zli.ch")
})

app.get("/name", (request, response) => {
    let name_list = ["Olivia", "Mason", "Ava", "Ethan", "Isabella", "Liam", "Charlotte", "Noah", "Amelia", "James", "Sophia", "Elijah", "Mia", "Benjamin", "Harper", "Lucas", "Ella", "Henry", "Grace", "Jackson"]
    let index = Math.floor(Math.random() * 18)
    response.send(name_list[index])
})

app.get('/html', (request, response) => {
    response.sendFile(__dirname + "html_express_endpoint.html");
});

app.get("/img", (request, response) => {
    response.sendFile(__dirname + "\\Hollow_knight_background.jpg");
})

app.get("/teapot", (request, response) => {
    response.status(418).send("418")
})


app.get("/user-agent", (request, response) => {
    response.send(request.get("user-agent"))
})


app.get("/secret", (request, response) =>{
    response.status(403).send("403")
})

app.get("/xml", (request, response) => {
    response.sendFile(__dirname + "\\static_xml.xml")
})

app.get("/me", (request, response) => {
    response.sendFile(__dirname + "\\me.json")
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});