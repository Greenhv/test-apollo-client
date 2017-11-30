import React, { PureComponent } from 'react';
import { ApolloProvider } from 'react-apollo';
import logo from './logo.svg';
import './App.css';
import CommentList from './containers/CommentList';
import CommentForm from './containers/CommentForm';

class App extends PureComponent {
  render() {
    const {
      client,
    } = this.props;

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Comment with Apollo</h1>
          </header>
          <div className="App-body">
            <CommentForm />
            <CommentList />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
