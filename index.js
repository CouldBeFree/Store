let x  = {
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Keep moving forward',
        complete: false
    }
};

let qwe = {
    type: 'REMOVE_TODO',
    id: 0
};

let y = {
    type: 'TOGGLE_TODO',
    id: 0
};

let z = {
    type: 'ADD_GOAL',
    goal:{
        id: 0,
        name: 'Test goal'
    }
};

let asd = {
    type: 'REMOVE_GOAL',
    id: 0
};

function todos(state = [], action) {
    if(action.type === 'ADD_TODO'){
        return state.concat([action.todo])
    } else if(action.type === 'REMOVE_TODO'){
        return state.filter((todo) => todo.id !== action.id)
    } else if(action.type === 'TOGGLE_TODO'){
        return state.map((todo) => todo.id !== action.id ? todo : {
            name: todo.name,
            id: todo.id,
            complete: !todo.complete
        })
    }
    return state
}

function createStore(reducer) {
    let state;
    let listeners = [];
    const getState = () =>state;
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    };

    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    };

    return{
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore(todos);
store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Keep moving forward',
        complete: false
    }
});