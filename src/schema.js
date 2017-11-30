export const typeDefs = `
type Comment {
  id: ID!
  content: String
}

type Query {
  comments: [Comment]
}
`