import {combineReducers} from "redux";

const initTodos = [
  {
    id: 0,
    text: 'First',
    completed: false
  },
  {
    id: 1,
    text: 'Second',
    completed: false
  },
  {
    id: 2,
    text: 'Third',
    completed: false
  },
];
const defaultTodoAction = {
  type: '',
  payload: {},
};
const todos = (state = initTodos, action = defaultTodoAction) => {
  if (action.type === 'todo/add') {
    return [
      action.payload,
      ...state
    ]
  } else if (action.type === 'todo/remove') {
    return state.filter(item => item.id !== action.payload.id);
  } else if (action.type === 'todo/toggle') {
    let nextState = [...state];
    nextState.forEach(item => {
      if (item.id === action.payload.id) {
        item.completed = !item.completed;
      }
    });
    return nextState;
  }
  return state;
};



const initFilter = {
  showStatus:'全部'
};
const defaultFilterAction = {
  type:'',
  payload: '',
}
const filter = (state = initFilter, action = defaultFilterAction) => {
  if(action.type === 'filter/update') {
    return {
      showStatus:action.payload
    }
  }
  return state;
}


const rootReducer = combineReducers({
  todos,
  filter
});

export default rootReducer;
