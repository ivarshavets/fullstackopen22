# Library App Frontend

## Tasks
Fullstackopen exercises [8.8-8.12](https://fullstackopen.com/en/part8/react_and_graph_ql#exercises-8-8-8-12), [8.17-8.22](https://fullstackopen.com/en/part8/login_and_updating_the_cache#exercises-8-17-8-22)

- Set up Apollo Client for communication between the React app and GraphQL.
```
npm install @apollo/client graphql
```
- Create a new client object, which sends a query to the server. Wrap the react app with Apolo Provider to make the client accessible for all component
- Define `queries` to provide to the client
- Use `useQuery` and `useMutation` React hooks for fetching and updating data
- [React-select](https://github.com/JedWatson/react-select) can be used for forms' selects

- Implement Login
- Updating the cache
- Configurate subscription on the client ([doc](https://www.apollographql.com/docs/react/data/subscriptions/))
  - install dependancies
  ```
  npm install graphql-ws
  ```
  -  set WebSocket connection to the GraphQL server with `new GraphQLWsLink`
  - The subscriptions are done using the [`useSubscription`](https://www.apollographql.com/docs/react/api/react/hooks/#usesubscription) hook function.
