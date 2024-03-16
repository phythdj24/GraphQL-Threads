import express from "express";
import { ApolloServer } from "@apollo/server";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";

const StartServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
             
      type User {
        id: ID!
        name:String!
        username:String!
        email:String!
        phone: String!
      }
           type Todo {
            id: ID!
            title: String!
            completed: Boolean
           }
           type Query {
            getTodos: [Todo]
           }
        `,
    
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log(`Server Running on PORT 8000`));
};

StartServer();
