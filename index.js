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
    switch (action.type){
        case 'ASS_TODO' :
            return state.concat([action.todo]);
        case 'REMOVE_TODO' :
            return state.filter((todo) => todo.id !== action.id);
        case 'TOGGLE_TODO' :
            return state.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, todo, {complete: !todo.complete})
            );
        default :
            return state
    }
}

function goals(state = [], action) {
    switch (action.type){
        case 'ADD_GOAL' :
            return state.concat([action.goal]);
        case 'REMOVE-GOAL' :
            return state.filter((goal) => goal.id !== action.id);
        default :
            return state
    }
}

function createStore(reducer) {
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
}