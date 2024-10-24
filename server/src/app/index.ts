import express from "express"

import bodyParser from "body-parser"

import cors from "cors"
import { ApolloServer } from "@apollo/server"

import Redis from "ioredis"

export async function initServer() {
    const app=express()

    app.use(bodyParser.json())
    app.use(cors())

    const redis=new Redis({
        host:"localhost",
        port:6379
    })
    app.post('/cache', async (req, res) => {
        const { key, value } = req.body;
      
        await redis.set(key, value);
        res.status(200).json({ message: 'Value stored in Redis' });
      });

      app.get('/cache', async (req, res) => {
        const { key } = req.query;
      
        const value = await redis.get(key as string);
        
        if (value) {
          res.status(200).json({ key, value });
        } else {
          res.status(404).json({ message: 'Key not found' });
        }
      })  
    

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