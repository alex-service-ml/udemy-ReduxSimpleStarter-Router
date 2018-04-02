import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      //console.log(action.payload.data); // [ post1, post2, ... ]
      return _.mapKeys(action.payload.data, 'id'); // Converts list of objects into an object
    case FETCH_POST:
      const post = action.payload.data;
      return { ...state, [post.id]: post }
    case DELETE_POST:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
