function List(props) {
    return (
        <ul>
            <li>List</li>
        </ul>
    )
}

class Todos extends React.Component{
    addItem = (e) => {
        e.preventDefault();
        const name = this.input.value;
        this.input.value = '';

        this.props.store.dispatch(addTodoAction({
            id: generateId(),
            name,
            complete: false
        }))
    };
    render(){
        return(
            <div>
                <h1>Todo list</h1>
                <input type="text" placeholder='Add Todo' ref={(input) => this.input = input}/>
                <button onClick={this.addItem}>Add Todo</button>
                <List/>
            </div>
        )
    }
}

class Goals extends React.Component{
    addItem = (e) => {
        e.preventDefault();
        const name = this.input.value;
        this.input.value = '';

        this.props.store.dispatch(addGoalAction({
            id: generateId(),
            name
        }))
    };
    render(){
        return(
            <div>
                <h1>Goals</h1>
                <input type="text" placeholder='Add Goal' ref={(input) => this.input = input}/>
                <button onClick={this.addItem}>Add Goal</button>
                <List/>
            </div>
        )
    }
}

class App extends React.Component{
    render(){
        return(
            <div>
                <Todos store={this.props.store}/>
                <Goals store={this.props.store}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App store={store}/>,
    document.getElementById('app')
);