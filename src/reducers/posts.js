// a reducer

function posts(state = [], action) {
  console.log('post reducer');
  switch (action.type) {
    case 'INCREMENT_LIKES' :{
      let i = action.index;
      if(i != undefined && state[i]){
        return [
          ...state.slice(0, i),
          {...state[i], likes: state[i].likes+1},
          ...state.slice(i+1)
        ];
      }
    }

    default: return state;
  }

}

export default posts;