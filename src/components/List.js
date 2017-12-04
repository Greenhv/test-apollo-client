import React from 'react';

const CommentList = ({ data, ItemComponent }) => (
  <ul>
    {data.map(value  => <ItemComponent key={value.id} id={value.id}>{value.content}</ItemComponent>)}
  </ul>
);

export default CommentList;
