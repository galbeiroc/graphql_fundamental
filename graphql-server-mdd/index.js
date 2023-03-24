import { gql, ApolloServer, UserInputError } from 'apollo-server';
import axios from 'axios';
import { v1 as uuid } from 'uuid';

const persons = [
  {
    name: 'galbeiroc',
    phone: '301-545889',
    street: 'Calle Florida',
    city: 'La Estrella',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  },
  {
    name: 'leo',
    street: 'Av Colombia',
    city: 'Robledo',
    id: '3fa85f64-5717-4562-b3fc-2c963f66054a'
  },
  {
    name: 'karen',
    phone: '321-145872',
    street: 'Principal Comfama',
    city: 'Sabaneta',
    id: '3fa85f64-5717-4562-b3fc-2c963f66cca21'
  }
];

// Definitions
const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }
  type Address {
    street: String!
    city: String!
  }
  type Person {
    name: String!
    phone: String
    address: Address!
    check: String!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`

// Resolvers
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: async(root, args) => {
      const { data: personFromApi } = await axios.get('http://localhost:3000/persons');

      if (!args.phone) return personFromApi;

      const byPhone = person => args.phone === 'YES' ? person.phone : !person.phone;
      return pepersonFromApirsons.filter(byPhone)
    },
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name
        })
      }

      const person = { ...args, id: uuid() };
      persons.push(person);
      return person;
    },
    editNumber: (root, args) => {
      const personIndex = persons.findIndex(p => p.name === args.name);
      if (personIndex === -1) return null;

      const person = persons[personIndex];
      const updatedPerson = { ...person, phone: args.phone };
      persons[personIndex] = updatedPerson;

      return updatedPerson;
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
