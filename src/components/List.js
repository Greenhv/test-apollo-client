import React from 'react';

const CommentList = ({ data }) => (
  <ul>
    {data.map(value  => <li key={value.id}>{value.content}</li>)}
  </ul>
);

export default CommentList;
