

function callback (ergebniss) {
    console.log("das ergebniss ist: " + ergebniss);
}


function verdoppeln (zahl, callback) {
    callback(2*zahl);
}

verdoppeln (5, callback);