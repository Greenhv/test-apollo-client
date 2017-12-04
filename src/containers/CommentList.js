import React, { PureComponent } from 'react';
import List from '../components/List';
import Comment from './Comment';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CommentList extends PureComponent {
  componentWillMount() {
    this.props.subscribeToNewComments();
    this.props.subscribeToDeleteComments();
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
      (error ? <p>{error.message}</p> : <List data={comments} ItemComponent={Comment} />)
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

const commentAddedSubscription = gql`
subscription commentAdded {
  commentAdded {
    id
    content
  }
}
`

const commentDeleteSubscription = gql`
subscription commentDeleted {
  commentDeleted {
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
          document: commentAddedSubscription,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            
            const newCommnet = subscriptionData.data.commentAdded;
            const newResult = {
              ...prev,
              comments: [...prev.comments, newCommnet],
            };

            return newResult;
          }
        })
      },
    subscribeToDeleteComments: () => {
      return props.comments.subscribeToMore({
        document: commentDeleteSubscription,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const deletedComment = subscriptionData.data.commentDeleted;
          console.log(deletedComment);
          const newComments = prev.comments.filter((comment) => comment.id !== deletedComment.id);
          const newResult = {
            ...prev,
            comments: newComments,
          };

          return newResult;
        }
      })
    }
    }
  }
})(CommentList);

export default CommentListData;