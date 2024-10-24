import express from "express"

import bodyParser from "body-parser"

import cors from "cors"
import { ApolloServer } from "@apollo/server"


export async function initServer() {
    const app=express()

    app.use(bodyParser.json())
    app.use(cors())
    

const graphqlServer=new ApolloServer<any>({
    typeDefs:`
    type Meow{
    voice:String 
    feline:String
    }
    
    type Query{
    meow:Meow

    }
    `,
    resolvers:{
        Query:{
            meow:()=>( {voice:"meow",feline:"cat"})
        }
       
    }
})

await graphqlServer.start()

app.use("./graphql",()=>console.log("server started"))

return app


}