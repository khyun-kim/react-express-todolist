import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import styled from 'styled-components';
import axios from 'axios';

function TodoListsPresenter(props) {
    const [todoInputValue, setTodoInputValue] = useState('');
    const [todoList, setTodoList] = useState({ list: [] });

    const LogoutBtnOnClick = (e) => {
        // redux email ''로 만들기
        // session 쿠키 삭제
        // history.push(/)
        axios.get('/api/auth/logout').then(() => {
            props.logoff();
            cookie.remove('session', { path: `/` });
        });
    };
    const handleDoneBtnClick = (index) => {
        const nextDone = todoList.list[index].done === 0 ? 1 : 0;
        axios
            .put('/api/todo', {
                TodoID: todoList.list[index].id,
                done: nextDone,
            })
            .then((res) => {
                if (res.data.status === 'success') {
                    const tmp = { ...todoList };
                    tmp.list[index].done = nextDone;
                    setTodoList(tmp);
                }
            });
    };
    const handleTodoSubmit = (e) => {
        e.preventDefault();
        axios
            .post('/api/todo', {
                todo: todoInputValue,
            })
            .then(() => {
                axios.get('/api/todo').then((res) => {
                    setTodoList({ list: res.data.rows });
                });
            });
    };
    const handleTodoInputChange = (e) => {
        setTodoInputValue(e.target.value);
    };
    useEffect(() => {
        axios.get('/api/todo').then((res) => {
            setTodoList({ list: res.data.rows });
        });
    }, []);
    return (
        <Container>
            <LogoutBtn onClick={LogoutBtnOnClick}>logout</LogoutBtn>
            <Form onSubmit={handleTodoSubmit}>
                <TodoInput
                    placeholder="할일을 입력해주세요"
                    value={todoInputValue}
                    onChange={handleTodoInputChange}
                    type="text"
                />
                <SubmitButton type="submit">+</SubmitButton>
            </Form>
            <TodoListContainer>
                {todoList.list.map((value, index) => {
                    return (
                        <TodoListItemContainer key={value.id}>
                            <TodoListItemText done={value.done}>
                                {value.todo}
                            </TodoListItemText>
                            <TodoListItemButton
                                done={value.done}
                                onClick={() => handleDoneBtnClick(index)}
                            >
                                ✅
                            </TodoListItemButton>
                        </TodoListItemContainer>
                    );
                })}
            </TodoListContainer>
        </Container>
    );
}
const TodoListItemContainer = styled.div`
    margin: 5px;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding: 5px;
    border-radius: 5px;
`;
const TodoListItemText = styled.p`
    flex: 1;
    text-decoration: ${(props) => (props.done ? 'line-through' : 'none')};
`;
const TodoListItemButton = styled.button`
    border: 0;
    border-radius: 50%;
    background-color: ${(props) => (props.done ? '#777777' : '#aaaaee')};
    width: 32px;
    height: 32px;
    margin: auto;
    cursor: pointer;
`;
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
