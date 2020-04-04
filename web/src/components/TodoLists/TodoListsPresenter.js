import React, { Component } from 'react';
import cookie from 'react-cookies';
import styled from 'styled-components';
import axios from 'axios';

class TodoListsPresenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoInputValue: '',
            todolist: {},
        };
        this.LogoutBtnOnClick = (e) => {
            // redux email ''로 만들기
            // session 쿠키 삭제
            // history.push(/)
            axios.get('/api/auth/logout').then(() => {
                props.logoff();
                cookie.remove('session', { path: `/` });
            });
        };
        this.handleTodoSubmit = (e) => {
            e.preventDefault();
        };
        this.handleTodoInputChange = (e) => {
            this.setState({
                ...this.state,
                todoInputValue: e.target.value,
            });
        };
    }
    componentDidmound() {
        // todo list 신청하는 코드
    }

    render() {
        return (
            <Container>
                <LogoutBtn onClick={this.LogoutBtnOnClick}>logout</LogoutBtn>
                <Form onSubmit={this.handleTodoSubmit}>
                    <TodoInput
                        placeholder="할일을 입력해주세요"
                        value={this.state.todoInputValue}
                        onChange={this.handleTodoInputChange}
                        type="text"
                    />
                    <SubmitButton type="submit">+</SubmitButton>
                </Form>
                <TodoListContainer></TodoListContainer>
            </Container>
        );
    }
}
const LogoutBtn = styled.button`
    width: 100px;
    margin: 10px 0px;
    border: 0;
    background-color: #10acbd;
    text-transform: uppercase;
    border-radius: 3px;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 auto;
`;
const TodoInput = styled.input`
    flex: 1;
    height: 30px;
    font-size: 20px;
    line-height: 30px;
    padding-left: 15px;
    padding-right: 15px;
    border: 0;
    border-radius: 15px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: row;
    padding: 20px;
    heigth: 72px;
    background-color: #ffeecc;
    border-radius: 36px;
`;
const TodoListContainer = styled.div`
    padding: 20px;
    margin-top: 30px;
    heigth: 72px;
    background-color: #aaaaee;
    border-radius: 36px;
`;

const SubmitButton = styled.button`
    width: 30px;
    height: 30px;
    margin: 0px 15px;
    border: 0;
    border-radius: 15px;
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    color: white;
    background-color: #aaaaee;
    cursor: pointer;
`;

export default TodoListsPresenter;
