import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginFormPresenter = props => {
    const [userInfo, setUserInfo] = React.useState({ email: '', password: '' });
    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('/api/auth', {
                email: userInfo.email,
                password: userInfo.password
            })
            .then(res => {
                if (res.data.status === 'LOGIN SUCCESS') {
                    props.login(userInfo.email);
                } else if (res.data.status === 'LOGIN FAILED') {
                    alert('로그인에 실패하였습니다.');
                }
            });
    };
    const handleEmailChange = e => {
        setUserInfo({ ...userInfo, email: e.target.value });
    };
    const handlePasswordChange = e => {
        setUserInfo({ ...userInfo, password: e.target.value });
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Title>로그인</Title>
            <label>Email</label>
            <Input
                type="text"
                placeholder="sample@email.com"
                value={userInfo.email}
                onChange={handleEmailChange}
            />
            <label>Password</label>
            <Input
                type="password"
                placeholder="******"
                value={userInfo.password}
                onChange={handlePasswordChange}
            />
            <Button type="submit">Sign In</Button>
            <p>
                계정이 없으신가요?{' '}
                <Link to="register">지금 이곳에서 새로 가입하세요.</Link>
            </p>
        </Form>
    );
};

const Title = styled.h1`
    text-align: center;
`;
const Form = styled.form`
    width: 300px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 20px;
`;
const Input = styled.input`
    margin: 30px 10px;
    border: 0;
    padding: 5px;
    border-bottom: 1px solid #111;
`;
const Button = styled.button`
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 600;
    height: 38px;
    line-height: 38px;
    background-color: blue;
    color: white;
    border: 0;
    border-radius: 3px;
    cursor: pointer;
    transition: box-shadow 0.2s;
    &:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 255, 0.7);
    }
`;
export default LoginFormPresenter;
