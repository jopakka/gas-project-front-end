import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {graphqlUrl} from './utils/variables';
import {MainProvider} from './context/MainContext';

const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }
});

ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <MainProvider>
          <App/>
        </MainProvider>
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
