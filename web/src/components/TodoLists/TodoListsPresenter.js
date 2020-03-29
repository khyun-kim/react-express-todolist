import React, { Component } from 'react';

class TodoListsPresenter extends Component {
    render() {
        return (
            <div>
                <form>
                    <input type="text" />
                    <button type="submit">+</button>
                </form>
            </div>
        );
    }
}

export default TodoListsPresenter;
