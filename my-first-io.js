const fs = require('fs')

let file_path = process.argv[2]

let buffer = fs.readFileSync(file_path, "utf8")

let result= buffer.toString().split('\n').length;

console.log(result-1)