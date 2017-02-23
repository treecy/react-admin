// a reducer
function oneComment(state = [], action) {
  switch (action.type) {
    case "ADD_COMMENT":{
      return [...state,{
        user: action.author,
        text: action.comment
      }]
    }

    case "REMOVE_COMMENT": {

    }
    default: return state;
  }
}

function comments(state = [], action) {
  console.log('comments reducer');
  if(action.type !== undefined){
    return {
      ...state,
      [action.postId]: oneComment(state[action.postId], action)
    }
  }

}

export default comments;