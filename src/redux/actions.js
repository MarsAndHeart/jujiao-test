let todoIndex = 10;

const addTodo = (text) => {
  todoIndex++;
  const todo = {
    id:todoIndex,
    text:text,
    completed:false
  }
  return {
    type: 'todo/add',
    payload: todo,
  }
};
const removeTodo = (todo) => ({
  type: 'todo/remove',
  payload: todo,
});
const toggleTodo = (todo) => ({
  type: 'todo/toggle',
  payload: todo,
});


const updateFilter = (showStatus) => ({
  type:'filter/update',
  payload: showStatus,
})

export default {
  addTodo,
  removeTodo,
  toggleTodo,
  updateFilter
};
