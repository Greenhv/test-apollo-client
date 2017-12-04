import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Comment = ({ mutate, children, id }) => {
  const deleteHandler = async (e) => {
    const deletedComment = await mutate({
      variables: { id },
    });
  };

  return (
    <li>
      <span>{ children }</span>
      <button onClick={deleteHandler}>X</button>
    </li>
  );
};

const deleteMutation = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`

const CommentWithMutation = graphql(deleteMutation)(Comment);

export default CommentWithMutation;