import 'colors'
import 'dotenv/config'
import { ApolloServer } from '@apollo/server'//'apollo-server-micro';
//import { usaMutation } from 'apollo/client'
import { startStandaloneServer } from '@apollo/server/standalone'
import { PrismaClient } from "@prisma/client";
import { ApolloSandbox } from '@apollo/sandbox/react';
//import { typeDefs } from './schema.js';
//import { resolvers } from './resolvers.js';
import { gql } from "apollo-server-micro";

const prisma = new PrismaClient();

/*
const typeDefs = gql` 
    type Staff{
        id: String
        name: String
        email: String
        phone: String
        address: String
        birthday: String
        sex: String
    }
    
    type Query{ 
        staff: [Staff]
    }

    
`;
*/

const typeDefs = gql`
    
  type Staff{
    id: String
    name: String
    email: String
    phone: String
    address: String
    birthday: String
    sex: String
  }

  type Query{ 
      status: [Staff]
  }

  type Mutation {
    createUser(
      name: String!, 
      email: String!, 
      phone: String!, 
      address: String!, 
      birthday: String!, 
      sex: String!
    ): Staff
      
    editUser(
      id: String!,
      name: String!, 
      email: String!, 
      phone: String!, 
      address: String!, 
      birthday: String!, 
      sex: String!
    ): Staff

    deleteUser(
      id: String!
    ): Staff


  }

`


const resolvers = {
  Query: {
      status: ( parents, args, context) => {
          return prisma.Staff.findMany();
      },
  },
  Mutation: {
    createUser: (parents, { name, email, phone, address, birthday, sex}, context) => {
      return prisma.Staff.create({data:{ name, email, phone, address, birthday, sex}});
    },

    editUser: (parents, { id, name, email, phone, address, birthday, sex}, context) => {
      return prisma.Staff.update({where: { id }, data:{ name, email, phone, address, birthday, sex}});
    },

    deleteUser: (parents, { id }, context) => {
      return prisma.Staff.delete({where: { id }});
    },
  },
  
};
  



//application schema
//all operations which will be fetch our data
//Mutation will contain operations that will change our database

/*export const resolvers = {
    Query: {
        staff: ( parents, args, context) =>{
            return prisma.staff.findMany()|'api is working';
        }
    },
    
    /*Mutation:{
        addStaff: (_parents,( name, email, phone, address, birthday, sex), _context) => {
            return prisma.staff.create({data: { name, email, phone, address, birthday, sex }});
        }

        editStaff: (_parents,(id, name, email, phone, address, birthday, sex), _context) => {
            return prisma.staff.update({where:{id}, data: { name, email, phone, address, birthday, sex }});
        }

        deleteStaff: ( _parents, {id}, _context ) =>{
            return prisma.staff.delete( { where: {id} } );
        }
    }*/  
//};
//fetch data, update data when the user decides

const API_PORT = process.env.API_PORT || 3000

const apolloServer = new ApolloServer({ typeDefs, resolvers}); //initial apollo server



//const startServer = async () =>{
  //  const { url } = await apolloServer.start(apolloServer,{
    //    listen: { port:3000},
    //});
    //console.log(`Server ready at: $(url)`);
//};
//startServer();
//const handler = apolloServer.createHandler({ path: "/api/graphql"}); //nextjs able to run this graphql endpoint

/*const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'http://localhost:3000/api/graphql' }));
*/

//app.use(function(req, res, next) {
  //  res.header("Access-Control-Allow-Origin", "https://studio.apollographql.com");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //next();
//});

//app.post('/api/graphql', (req, res) => {
    // Handle GraphQL request
//});

//app.listen(3000, () => console.log('Server listening on port 3000'));

  
/*export function EmbeddedSandbox() {
  return (
    <ApolloSandbox
      initialEndpoint='/api/graphql'
    />
  );
}*/
/*
fetch('http://localhost:3000/api/graphql', {
  mode: 'no-cors'
  //method: 'POST',
  //headers: { 'Content-Type': 'application/json' },
  //body: JSON.stringify({ query: '{ hello }' }),
  })
.then(response => {
    // Handle response
})
.catch(error => {
    // Handle error
});
*/

const { url } = await startStandaloneServer(apolloServer, {
  context: async ({ req }) => ({ token: req.headers.token}),
  listen: {port: API_PORT}
})
console.log(`${'Server is listening at:'.green} ${url.yellow}`)
console.log(`${'Query at:'.magenta} ${'http://localhost:4000/'.yellow}`)
  




/*
const handler = await apolloServer.start().then(() => apolloServer.createHandler({ path: "/api/graphql" }));

export const config = { api: { bodyParser: false } };

export default handler;
*/