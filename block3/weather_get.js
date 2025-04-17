const express = require('express');
const app = express();
const port = 3001;

app.get("/weather/:plz", async (request, response) => {
    let plz = request.params.plz;
    console.log("Suche Wetter für PLZ "+ plz);
    let temp = await getData(plz)
    response.send(temp)

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


async function getData(plz) {
    const url = "https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=" + plz + "00";
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    return json.currentWeather.temperature;
}
