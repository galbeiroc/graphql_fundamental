
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
