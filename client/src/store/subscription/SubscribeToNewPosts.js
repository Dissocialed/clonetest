import gql from 'graphql-tag'

const subscribeToNewPosts = subscribeToMore => {
  subscribeToMore({
    document: NEW_POSTS_SUBSCRIPTION,
    updateQuery: (prev, {subscriptionData}) => {
      if (!subscriptionData.data) return prev
      const newPost = subscriptionData.data.newPost
      const exists = prev.feed.posts.find(({id}) => id === newPost.id)
      if (exists) return prev

      return Object.assign({}, prev, {
        feed: {
          posts: [newPost, ...prev.feed.posts],
          count: prev.feed.posts.length + 1,
          __typename: prev.feed.__typename,
        },
      })
    },
  })
}

const NEW_POSTS_SUBSCRIPTION = gql`
  subscription {
    newPost {
      id
      imgUrl
      description
      createdAt
      op {
        id
        name
      }
      likes {
        id
        user {
          id
        }
      }
    }
  }
`

export {subscribeToNewPosts}
