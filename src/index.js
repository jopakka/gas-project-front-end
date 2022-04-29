import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {basename, graphqlUrl} from './utils/variables';
import {MainProvider} from './context/MainContext';
import {createRoot} from 'react-dom/client';
import {setContext} from '@apollo/client/link/context';
import {BrowserRouter} from 'react-router-dom';

const httpLink = createHttpLink({
  uri: graphqlUrl,
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <MainProvider>
          <BrowserRouter basename={basename}>
            <App/>
          </BrowserRouter>
        </MainProvider>
      </ApolloProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
