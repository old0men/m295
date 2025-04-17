const fs = require("node:fs")

function leseDateiInhalt(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (error, data) => {
            if (error) {
                return reject(error)
            }
            return resolve(data.toString().split("\n").length)
        })
    })
}

let path = process.argv[2]

leseDateiInhalt(path)
    .then(content => {
        console.log("content read: " + content)
    })
    .catch(content => {
        console.error("something went wrong")
    });