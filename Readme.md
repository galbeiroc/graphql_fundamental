
# GraphQL

**GraphQL** is a new API standard that provides a more efficient, powerful and flexible alternative to REST. It was developed and open-sourced by Facebook and is now maintained by a large community of companies and individuals from all over the world.

1. Describe your data
```ts
type Project {
  name: String!
  tagline: String
  contributors: [User]
}
```
2. Ask for what you want
```ts
{
  project(name: "GraphQL") {
    tagline
  }
}
```
3. Get predictable results
```json
{
  "project": {
    "tagline": "A query language for APIs"
  }
}
```

* *APIs* have become ubiquitous components of software infrastructures. In short, an `API` defines how a `client` can load data from a server.

#### GraphQL - A Query Language for APIs

Most applications today have the need to fetch data from a server where that data is stored in a database. It’s the responsibility of the API to provide an interface to the stored data that fits an application’s needs.

#### A more efficient Alternative to REST
💡 Learn more about the top reasons to use GraphQL in [this](https://www.prisma.io/blog/top-5-reasons-to-use-graphql-b60cfa683511) blog post.

1. Increased mobile usage creates need for efficient data loading.
2. Variety of different frontend frameworks and platforms.
3. Fast development & expectation for rapid feature development.

**GraphQL** is often confused with being a database technology. This is a misconception, GraphQL is a query language for APIs - not databases. In that sense it’s database agnostic and effectively can be used in any context where an API is used.

## GraphQL is the better REST

Over the past decade, `REST` has become the standard (yet a fuzzy one) for designing web APIs. It offers some great ideas, such as `stateless servers` and `structured access to resources`. However, REST APIs have shown to be too inflexible to keep up with the rapidly changing requirements of the clients that access them.

**GraphQL** was developed to cope with the need for more flexibility and efficiency! It solves many of the shortcomings and inefficiencies that developers experience when interacting with REST APIs.

To illustrate the major differences between REST and GraphQL when it comes to fetching data from an API, let’s consider a simple example scenario: In a blogging application, an app needs to display the titles of the posts of a specific user. The same screen also displays the names of the last 3 followers of that user. How would that situation be solved with REST and GraphQL?

💡 Check out [this](https://www.prisma.io/blog/top-5-reasons-to-use-graphql-b60cfa683511) article to learn more about why developers love GraphQL.

#### Data Fetching with REST vs GraphQL
With a REST API, you would typically gather the data by accessing multiple endpoints. In the example, these could be `/users/<id>` endpoint to fetch the initial user data. Secondly, there’s likely to be a `/users/<id>/posts` endpoint that returns all the posts for a user. The third endpoint will then be the `/users/<id>/followers` that returns a list of followers per user.

<img src="https://imgur.com/VRyV7Jh.png" height="300px" width="200px" alt="Rest" />

*With REST, you have to make three requests to different endpoints to fetch the required data. You’re also overfetching since the endpoints return additional information that’s not needed.*

In GraphQL on the other hand, you’d simply send a single query to the GraphQL server that includes the concrete data requirements. The server then responds with a JSON object where these requirements are fulfilled.

<img src="https://imgur.com/z9VKnHs.png" height="200px" width="200px" alt="GraphQL" />

*Using GraphQL, the client can specify exactly the data it needs in a query. Notice that the structure of the server’s response follows precisely the nested structure defined in the query.*

## Core Concepts

#### The Schema Definition Language (SDL)

GraphQL has its own type system that’s used to define the schema of an API. The syntax for writing schemas is called [Schema Definition Language (SDL)](https://www.prisma.io/blog/graphql-sdl-schema-definition-language-6755bcb9ce51).

Here is an example of how we can use the SDL to define a simple type called Person:

#### Basic Types

The GraphQL schema language supports the scalar types of `String`, `Int`, `Float`, `Boolean`, and `ID`

```ts
type Person {
  name: String! // ! is required
  age: Int!
  posts [Post!]! // associtions between types
}

type Post {
  title: String!
  author: Person! // associtions between types
}
```

**Note** that we just created a one-to-many-relationship between `Person` and `Post` since the `posts` field on `Person` is actually an array of posts.

#### Fetching Data with Queries

When working with REST APIs, data is loaded from specific endpoints. Each endpoint has a clearly defined structure of the information that it returns. This means that the data requirements of a client are effectively encoded in the URL that it connects to.

The approach that’s taken in GraphQL is radically different. Instead of having multiple endpoints that return fixed data structures, GraphQL APIs typically only expose a *single endpoint*.

That means that the client needs to send more information to the server to express its data needs - this information is called a *query*.

##### Basic Queries
Let’s take a look at an example query that a client could send to a server:

```ts
{
  allPersons {
    name
  }
}
```

The `allPersons` field in this query is called the root field of the query. Everything that follows the root field, is called the payload of the query. The only field that’s specified in this query’s payload is name.

This query would return a list of all persons currently stored in the database. Here’s an example response:

```ts
{
  "allPersons": [
    { "name": "Johnny" },
    { "name": "Sarah" },
    { "name": "Alice" }
  ]
}
```

Notice that each person only has the `name` in the response, but the `age` is not returned by the server. That’s exactly because `name` was the only field that was specified in the query.

If the client also needed the persons’ `age`, all it has to do is slightly adjust the query and include the new field in the query’s payload:

```ts
{
  allPersons {
    name
    age
  }
}
```

One of the major advantages of **GraphQL** is that it allows for naturally querying nested information. For example, if you wanted to load all the `posts` that a `Person` has written, you could simply follow the structure of your types to request this information:

```ts
{
  allPersons {
    name
    age
    posts {
      title
    }
  }
}
```

##### Queries with Arguments

In GraphQL, each field can have zero or more arguments if that’s specified in the schema. For example, the `allPersons` field could have a `last` parameter to only return up to a specific number of persons. Here’s what a corresponding query would look like:

```ts
{
  allPersons(last: 2) {
    name
  }
}
```
