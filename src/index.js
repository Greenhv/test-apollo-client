import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
// import { WebSocketLink } from 'apollo-link-ws';
// import { SubscriptionClient } from 'subscriptions-transport-ws';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const httpLink = new HttpLink({ uri: 'http://0.0.0.0:4000/graphql' });

// const wsClient = SubscriptionClient('ws://0.0.0.0:4000/subscriptions');
// const wsLink = new WebSocketLink(wsClient);
const link = ApolloLink.from([httpLink]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

ReactDOM.render(<App client={client} />, document.getElementById('root'));
registerServiceWorker();
