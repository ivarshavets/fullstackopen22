
// The backend is at localhost:3001 and in dev mode the frontend is at the address localhost:3000.
// It still works with relative URL in dev mode due to Proxy configured in package.json.
// The React development environment works as a proxy. If the React code does an HTTP request to a server address at http://localhost:3000 not managed by the React application itself (i.e. when requests are not about fetching the CSS or JavaScript of the application), the request will be redirected to the server at http://localhost:3001.

export const BASE_URL = '/api'

// export const BASE_URL = 'http://localhost:3001/api'
