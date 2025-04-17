
let result = 0;

process.argv.forEach(
    (arg) => {
        if (arg !== process.argv[0] && arg !== process.argv[1])
            {result += parseInt(arg)}
    }
)

console.log(result);
