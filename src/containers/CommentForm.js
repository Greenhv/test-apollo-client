import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const CommentForm = ({ mutate }) => {
  const handleKeyUp = async (e) => {
    if (e.keyCode === 13) {
      e.persist();
      try {
        await mutate({
          variables: { content: e.target.value },
        });
        e.target.value = '';
        // window.location.reload() // Temporal solution, should be deleted after the socket implementation it's ready
      } catch(exp) {
        alert(`Ocurrio un error \n ${exp}`);
      } 
    }
  }
  return (
  <form>
    <textarea name="comment" cols="50" rows="10" onKeyUp={handleKeyUp} ></textarea>
  </form>
)};

const createCommentMutation = gql`
  mutation addComment($content: String!) {
    addComment(content: $content) {
      id
      content
    }
  }
`;

const CommentFormWithMutation = graphql(createCommentMutation)(CommentForm);

export default CommentFormWithMutation;