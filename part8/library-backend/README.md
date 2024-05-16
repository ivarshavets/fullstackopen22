# Library App Backend

## Tasks
Fullstackopen exercises [8.1-8.7](https://fullstackopen.com/en/part8/graph_ql_server#exercises-8-1-8-7),
[8.13-8.16](https://fullstackopen.com/en/part8/database_and_user_administration#exercises-8-13-8-16)

- Implement GraphQL server using Apollo Server.
```
npm install @apollo/server graphql
```
- Install Mongoose and dotenv
```
npm install mongoose dotenv
```
- Define Mangoose schema
- Define GraphQL schema with queries and mutations
- Define GraphQL resolvers which use Mangoose queries. Add GraphQL validation to have error handling.
- Introduce Subscription for the communication from server to the browser (app's listening to the server). Configurate on the server ([documentation](https://www.apollographql.com/docs/apollo-server/data/subscriptions)).
  - install espress
  ```
  npm install express cors
  ```
  - use more robust `expressMiddleware` function instead of `startStandaloneServer` (the letter does not allow adding subscriptions to the application)
  - install packages for adding subscriptions to GraphQL and a Node.js WebSocket library
  ```
  npm install graphql-ws ws @graphql-tools/schema
  ```
  When queries and mutations are used, GraphQL uses the HTTP protocol in the communication. In case of subscriptions, the communication between client and server happens with WebSockets.
  - install
  ```
  npm install graphql-subscriptions
  ```
  With subscriptions, the communication happens using the [publish-subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) principle utilizing the object [PubSub](https://www.apollographql.com/docs/apollo-server/data/subscriptions#the-pubsub-class).
  - add Subscription to resolvers
  ```
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
  ```
  The resolver of the `bookAdded` subscription registers and saves info about all the clients that do the subscription. The clients are saved to an "iterator object" called BOOK_ADDED. It sends a WebSocket message about the added person to all the clients registered in the iterator PERSON_ADDED.
  - update `addBook` resolver
  ```
  pubsub.publish('BOOK_ADDED', { bookAdded: book })
  ```
  Adding a new book publishes a notification about the operation to all subscribers with PubSub's method publish
- Configurate subscription on the client ([doc](https://www.apollographql.com/docs/react/data/subscriptions/))
  
