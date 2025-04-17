const express = require("express")
const {request, response} = require("express");
const session = require("express-session");
const app = express()
const port = 3001

app.use(express.urlencoded ({extended: true}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));

let bookshelve;

bookshelve =[
        {
            bookid: 1,
            booktitle: "asdf",
            isbn: "asdf-3456-cvbn-1536",
            realeasedate: "11.30.2005",
            author: "yxpcov werasdf"
        },
        {
            bookid: 2,
            booktitle: "The Whispering Shadows",
            isbn: "bk02-8271-lmno-8421",
            realeasedate: "06.15.2008",
            author: "Elira Dawn"
        },
        {
            bookid: 3,
            booktitle: "Echoes of the Forgotten",
            isbn: "bk03-9123-abcd-2374",
            realeasedate: "03.12.2010",
            author: "Marek Thorne"
        },
        {
            bookid: 4,
            booktitle: "Beneath Crimson Skies",
            isbn: "bk04-1357-zxyw-4790",
            realeasedate: "09.21.2012",
            author: "Kaela Rhys"
        },
        {
            bookid: 5,
            booktitle: "A Study in Obsidian",
            isbn: "bk05-6482-qwer-7591",
            realeasedate: "12.03.2014",
            author: "Jorren Vale"
        },
        {
            bookid: 6,
            booktitle: "Fragments of a Dying Star",
            isbn: "bk06-3321-vutp-1289",
            realeasedate: "07.08.2016",
            author: "Isolde Venn"
        },
        {
            bookid: 7,
            booktitle: "The Ember Archive",
            isbn: "bk07-5612-plmn-9801",
            realeasedate: "02.25.2017",
            author: "Davin Krell"
        },
        {
            bookid: 8,
            booktitle: "Of Salt and Serpents",
            isbn: "bk08-9182-hgtr-3347",
            realeasedate: "11.17.2018",
            author: "Tessa Maren"
        },
        {
            bookid: 9,
            booktitle: "Celestial Nomads",
            isbn: "bk09-4573-njuy-6678",
            realeasedate: "04.29.2020",
            author: "Callum Dros"
        },
        {
            bookid: 10,
            booktitle: "The Mirror Pact",
            isbn: "bk10-2031-qazx-1190",
            realeasedate: "10.13.2022",
            author: "Rhea Solen"
        }
]

let lends = [

]

let user_db = [
    {
        username: "admin",
        password: "admin1234",
        cookie: []
    },
    {
        username: "unverifiable",
        password: "1234",
        cookie: []
    }
]

app.get("/books", (request, response) => {
    response.send(bookshelve)
})

app.get("/books/:isbn", (request, response) => {
    let isbn = request.params.isbn
    let result;
    for (book of bookshelve) {
        if (book.isbn === isbn) {
            result = book
        }
    }
    response.send(result)
})

app.post("/books", (request, response) => {
    let new_book = request.body
    bookshelve.books = {...bookshelve.books, new_book }
    response.send(bookshelve)
})

app.put("/books/:isbn", (request, response) => {

    let isbn = request.params.isbn
    let replacement = request.body
    let result;

    for (book of bookshelve) {
        if (book.isbn === isbn) {
            book.bookid = replacement.bookid
            book.booktitle = replacement.booktitle
            book.isbn = isbn
            book.realeasedate = replacement.realeasedate
            book.author = replacement.author

            result = book
            response.send(result)
            return
        }
    }
    response.send("no such isbn in bookshelve: try again")
})

app.delete("/books/:isbn", (request, response) => {
    for (book in bookshelve) {
        if (bookshelve[book].isbn === request.params.isbn) {
            bookshelve.splice(book, 1)
            console.log(bookshelve[book])
        }
    }
    response.send(bookshelve)
})

app.patch("/books/:isbn", (request, response) => {
    let book = bookshelve.find((book) => book.isbn === request.params.isbn)
    if (request.body.booktitle) {book.booktitle = request.body.booktitle}
    if (request.body.bookid) {book.bookid = request.body.bookid}
    if (request.body.realeasedate) {book.realeasedate = request.body.realeasedate}
    if (request.body.author) {book.author = request.body.author}
    response.send(book)
})

app.get("/lends", (request, response) => {
    response.send(lends)
})

app.get("/lends/:id", (request, response) => {
    let lend = lends.find((lend) => lend.id == request.params.id)
    console.log(lend)
    response.send(lend)
})

app.post("/lends", (request, response) => {
        if (request.body.borrowed_at ||
            request.body.id ||
            request.body.customer_id ||
            request.body.returned_at
        ) {
            let lend = {id: lends.length, ...request.body}
            lends.push(lend)
            response.status(201).send("successful post")
        } else {
            response.status(422).send("gib better posts")
        }
})

app.delete("/lends/:id", (request, response) => {
    let lend = lends.findIndex((lend) => lend.id == request.params.id)
    lends.splice(lend, 1)
    response.send(lends)
})

app.post("/login", (request, response) => {
    let user = user_db.find((user) => user.username == request.body.username)
    if (request.body.password === user.password) {
        if (user.username === "unverifiable") {
            request.session.authentication = false
            user.cookie.push(request.session)
            response.send(user)
        } else {
            request.session.authentication = true
            user.cookie.push(request.session)
            response.send(user)
        }
    } else {
        response.status(401).send("Not registered")
    }

})

app.get("/verify", (request, response) => {
    let user = user_db.find((user) =>
                        user.cookie.find((cookie) =>
                                cookie.authentication === true))
    if (user) {
        response.status(200).send(user.username)
    } else {
        response.status(401).send("user isn't authentifid")
    }
})


app.delete("/logout", (request, response) => {
    let user = user_db.find((user) =>
                        user.cookie.find((cookie) =>
                            cookie.authentication === true))
    user.cookie.splice(0, user.cookie.length)
})



app.listen(port, () => {
    console.log("successful connection to port: " + port + "\nlink: localhost:" + port + "/")
})