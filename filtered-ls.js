const fs = require("fs");

let directory = process.argv[2]
let extension = process.argv[3]

function directory_extension_filter(directory, extension) {
    fs.readdir(directory, (err, files) => {
        if (err) return console.error(err)
        files.forEach(file => {
            if (file.split(".")[1] === extension) {
                console.log(file)
            }

        })
    })
}

directory_extension_filter(directory, extension);

