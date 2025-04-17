const express = require("express")
const app = express()
const port = 3001

let namelist = []

app.use(express.urlencoded({ extended: true}))

app.post("/names", (request, response) => {
    let name = request.body.name
    namelist.push(name)
    console.log(name)
    response.send(request.body)
})

app.delete("/names", (request, response) => {
    console.log("got to here")

    let name = request.query.name;
    for (name_index in namelist) {
        if (name === namelist[name_index]) {
            console.log("deleted: " + namelist[name_index])
            namelist.splice(name_index)
        }
    }
    response.status(204).send("succesful")



})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});