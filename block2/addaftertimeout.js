async function timedilation(ms){
    return new Promise(
        (resolve, reject) => {
            if (ms < 0) {
                return reject("ms has to be positive")
            }
            setTimeout(resolve, ms)
        }
    );
}

async function addaftertimout(a, b, ms) {
    await timedilation(ms)
    console.log(a+b)
}

addaftertimout(3, 7, 2000)