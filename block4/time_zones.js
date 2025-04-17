const express = require("express")
const app = express()
const port = 3001

app.get("/now/:continent/:city", (request, response) => {
    const now = new Date();

    const timeZone = request.params.continent + "/" + request.params.city;
    console.log(timeZone)

    const formattedTime = now.toLocaleString('en-US', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    console.log(`Current time in ${timeZone}: ${formattedTime}`);
    response.send(`Current time in ${timeZone}: ${formattedTime}`)
})

let namelist = []

app.post("/names", upload.none(), (request, response) => {
    namelist.push(request.body.name)
    response.send(request.body)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
