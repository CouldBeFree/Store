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
    }
    return state
}

function createStore() {
    let state;
    let listeners = [];
    const getState =()=>state;
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    };

    const dispatch = (action) => {
      state = todos(state, action);
      listeners.forEach((listener) => listener())
    };

    return{
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore();
store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Keep moving forward',
        complete: false
    }
});