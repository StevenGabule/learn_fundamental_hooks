function postReducer(state, action) {
  switch (action.type) {
    case 'ADD_POST':
      const newPost = action.payload.post;
      return {
        posts: [...state.posts, newPost],
      };
    case 'DELETE_POST':
      const id = action.payload.id;
      return {
        posts: state.posts.filter((post) => post.id !== id),
      };
    default:
      break;
  }
}

export default postReducer;
