import React, { PureComponent } from 'react';
import List from '../components/List';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CommentList extends PureComponent {
  componentWillMount() {
    this.props.subscribeToNewComments();
  }
  
  render() {
    const {
      data: {
        loading,
        error,
        comments,
      },
    } = this.props;

    return (
      loading ? <p>Loading...</p> : 
      (error ? <p>{error.message}</p> : <List data={comments} />)
    )
  }
}

const commentQuery = gql`
query CommentQuery {
  comments {
    id
    content
  }
}
`

const commentSubscription = gql`
subscription commentAdded {
  commentAdded {
    id
    content
  }
}
`

const CommentListData = graphql(commentQuery, {
  name: 'comments',
  props: props => {
    return {
      data: {
        ...props.comments
      },
      subscribeToNewComments: () => {
        return props.comments.subscribeToMore({
          document: commentSubscription,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            
            const newCommnet = subscriptionData.data.commentAdded;
            const newResult = {
              ...prev,
              comments: [...prev.comments, newCommnet],
            }

            return newResult;
          }
        })
      }
    }
  }
})(CommentList);

export default CommentListData;