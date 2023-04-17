import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Users</h1>
      </div>
    </ApolloProvider>
  );
}

export default App;
