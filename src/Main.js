import React from 'react';
import {compose} from "redux";
import {connect} from 'react-redux';
import action from './redux/actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  page: {
    padding: '10px'
  },
  inputLine: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    margin: '10px'
  },
  todoItem: {
    width: '300px',
    height: '50px',
    lineHeight: '50px',
    fontSize: '24px'
  },
  removeBtn: {
    float: 'right',
  }
}


function Main(props) {
  const [state, setState] = React.useState({
    todoText: ''
  });
  const handleChangeTodoText = event => {
    setState({todoText: event.target.value});
  };

  const addTodo = () => {
    const text = state.todoText.trim();
    if (text) {
      props.addTodo(state.todoText)
      setState({todoText: ''});
    }
  }
  return (
    <div style={styles.page}>
      <div style={styles.inputLine}>
        <TextField
          value={state.todoText}
          onChange={handleChangeTodoText}
          margin="normal"
        />
        <Button variant='outlined' size="small" onClick={addTodo}>
          添加
        </Button>
      </div>


      <div>
        {props.todos.map(todo => (
          <div key={todo.id} style={styles.todoItem}>
            <Checkbox
              color="primary"
              checked={todo.completed}
              onChange={() => {
                props.toggleTodo(todo)
              }}
            />
            <span
              style={todo.completed ? {textDecoration: 'line-through'} : {}}
              onClick={() => {
                props.toggleTodo(todo)
              }}
            >
            {todo.text}
            </span>
            <span style={styles.removeBtn} onClick={() => {
              props.removeTodo(todo)
            }}>
              <IconButton color="default" size="small">
                <DeleteIcon/>
              </IconButton>
            </span>


          </div>
        ))}
      </div>


      <div>
        <Button
          variant={props.showStatus === '全部' ? 'contained' : 'outlined'}
          style={styles.button}
          onClick={() => {
            props.updateFilter('全部')
          }}
        >
          全部
        </Button>
        <Button
          variant={props.showStatus === '已完成' ? 'contained' : 'outlined'}
          style={styles.button}
          onClick={() => {
            props.updateFilter('已完成')
          }}
        >
          已完成
        </Button>
        <Button
          variant={props.showStatus === '未完成' ? 'contained' : 'outlined'}
          style={styles.button}
          onClick={() => {
            props.updateFilter('未完成')
          }}
        >
          未完成
        </Button>
      </div>

    </div>
  );
}

function propsMapping(store) {
  const {todos, filter} = store;

  let visibleTodos = todos;
  if (filter.showStatus === '已完成') {
    visibleTodos = todos.filter(item => item.completed)
  } else if (filter.showStatus === '未完成') {
    visibleTodos = todos.filter(item => !item.completed)
  }
  return {
    todos: visibleTodos,
    showStatus: filter.showStatus
  };
}

function actionMaping(dispatch) {
  return {
    addTodo: compose(dispatch, action.addTodo),
    removeTodo: compose(dispatch, action.removeTodo),
    toggleTodo: compose(dispatch, action.toggleTodo),
    updateFilter: compose(dispatch, action.updateFilter)
  };
}

export default connect(propsMapping, actionMaping)(Main);
