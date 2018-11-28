function generateId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)
}

/*function createStore(reducer) {
    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
        console.log(state);
    };

    return {
        getState,
        subscribe,
        dispatch
    }
}*/

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const RECIEVE_DATA = 'RECIEVE_DATA';

const  checker = (store) => (next) => (action) => {
    if(action.type === ADD_TODO && action.todo.name.toLowerCase().indexOf('bitcoin') !== -1){
        return alert('Nope. Thats a bad idea')
    }

    if(action.type === ADD_GOAL && action.goal.name.toLowerCase().indexOf('bitcoin') !== -1){
        return alert('Nope. Thats a bad idea')
    }

    return next(action);
};

const logger = (store) => (next) => (action) => {
    const result = next(action);
    console.log('The new state: ', store.getState());
    return result
};

const thunk = (store) => (next) => (action) => {
    if(typeof action === 'function') {
        return action(store.dispatch)
    }

    return next(action)
};

const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals,
    loading
}), Redux.applyMiddleware(checker, logger, thunk));

function loading(state = true, action) {
    switch(action.type) {
        case RECIEVE_DATA :
            return false;
        default :
            return state
    }
}

function addTodoAction(todo) {
    return{
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction(id) {
    return{
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction(id) {
    return{
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction(goal) {
    return{
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction(id) {
    return{
        type: REMOVE_GOAL,
        id
    }
}

function recieveDataAction(todos, goals) {
    return{
        type: RECIEVE_DATA,
        todos,
        goals
    }
}

function handleDeleteTodo(todo) {
    return (dispatch) => {
        dispatch(removeTodoAction(todo.id));
        return API.deleteTodo(todo.id)
            .catch(() => {
                dispatch(addTodoAction(todo));
                alert('An error occurred. Try again.')
            });
    };
}

function handleDeleteGoal (goal) {
    return (dispatch) => {
        dispatch(removeGoalAction(goal.id));

        return API.deleteGoal(goal.id)
            .catch(() => {
                dispatch(addGoalAction(goal));
                alert('An error occurred. Try again')
            })
    }
}

function handleAddGoal (name, cb) {
    return(dispatch) => {
        return API.saveGoal(name)
            .then((goal) => {
                dispatch(addGoalAction(goal));
                cb()
            })
    }
}

function todos(state = [], action) {
    switch (action.type){
        case ADD_TODO :
            return state.concat([action.todo]);
        case REMOVE_TODO :
            return state.filter((todo) => todo.id !== action.id);
        case TOGGLE_TODO :
            return state.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, todo, {complete: !todo.complete})
            );
        case RECIEVE_DATA :
            return action.todos;
        default :
            return state
    }
}

function goals(state = [], action) {
    switch (action.type){
        case ADD_GOAL :
            return state.concat([action.goal]);
        case REMOVE_GOAL :
            return state.filter((goal) => goal.id !== action.id);
        case RECIEVE_DATA :
            return action.goals;
        default :
            return state
    }
}

/*function app(state = {}, action) {
    return{
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

store.subscribe(()=>{
    const { goals, todos } = store.getState();

    document.getElementById('goals').innerHTML = '';
    document.getElementById('todos').innerHTML = '';

    goals.forEach(addGoalToDOM);
    todos.forEach(addTodoToDOM);
});

function createRemoveButton(onClick) {
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'X';
    removeBtn.addEventListener('click', onClick);

    return removeBtn
}

function addTodoToDOM(todo) {
    const node = document.createElement('li');
    const text = document.createTextNode(todo.name);

    const removeBtn = createRemoveButton(() => {
        store.dispatch(removeTodoAction(todo.id))
    });

    node.appendChild(text);
    node.appendChild(removeBtn);

    node.style.textDecoration = todo.complete ? 'line-through' : 'none';
    node.addEventListener('click',()=>{
        store.dispatch( toggleTodoAction(todo.id))
    });

    document.getElementById('todos').appendChild(node)
}

function addGoalToDOM(goal) {
    const node = document.createElement('li');
    const text = document.createTextNode(goal.name);

    const removeBtn = createRemoveButton(()=>{
        store.dispatch( removeGoalAction(goal.id))
    });

    node.appendChild(text);
    node.appendChild(removeBtn);

    document.getElementById('goals').appendChild(node)
}

function addTodo() {
    const input = document.getElementById('todo');
    const name = input.value;
    input.value = '';

    store.dispatch( addTodoAction({
        id: generateId(),
        name,
        complete: false
    }))
}

function addGoal() {
    const input = document.getElementById('goal');
    const name = input.value;
    input.value = '';

    store.dispatch( addGoalAction({
        id: generateId(),
        name,
        complete: false
    }))
}

document.getElementById('todoBtn').addEventListener('click', addTodo);
document.getElementById('goalBtn').addEventListener('click', addGoal);*/