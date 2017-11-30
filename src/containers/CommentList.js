import React from 'react';

import List from '../components/List';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const commentQuery = gql`
  query CommentQuery {
    comments {
      id
      content
    }
  }
`

const CommentList = ({ data: { loading, error, comments } }) => (
  loading ? <p>Loading...</p> : 
  (error ? <p>{error.message}</p> : <List data={comments} />)
);

const CommentListData = graphql(commentQuery)(CommentList);

export default CommentListData;