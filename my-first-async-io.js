const fs = require('fs')

let file_path = process.argv[2]

fs.readFile(file_path, "utf-8", (err, buffer) => {
    if (err) return console.error(err)
    let result= buffer.toString().split('\n').length;
    console.log(result-1)
})



