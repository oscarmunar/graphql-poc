const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

var schema = buildSchema(`

    type Book {
        id: Int
        title: String
        isbn: String
    }

    type Query {
        books: [Book]
        book(id: Int): Book
    }

`)


var books = [
    {
        id: "1",
        title: "Lord of The Rings",
        isbn: "3689"
    },
    {
        id: "2",
        title: "A Song of Ice and Fire",
        isbn: "9100"
    },
    {
        id: "3",
        title: "Takeshi Kovac",
        isbn: "7777"
    }

]

const root = {
    books: ()=> {return books},

    book: (data) => {
        for ( var i=0; i<books.length; i++ )
            if ( books[i].id == data.id )
                return books[i];
        
        return null;
    },

    addBook: (data) => {

    },
    
    deleteBook: (id) => {
        
    }
}


var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000);
console.log('Works it graphQL!!!!!!!!!!')