import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import validateEmail from '../../utils/EmailValidation';

const RegisterFormPresenter = props => {
    const [registerInfo, setRegisterInfo] = React.useState({
        email: '',
        password: '',
        check: ''
    });
    const [isEnableBtn, setIsEnableBtn] = React.useState(false);
    const [isEqualPassword, setIsEqualPassword] = React.useState(false);
    const [isEmailWarn, setIsEmailWarn] = React.useState(true);
    const handleRegisterSubmit = e => {
        e.preventDefault();
        if (!isEnableBtn) return;
        axios
            .put('/api/auth', {
                email: registerInfo.email,
                password: registerInfo.password
            })
            .then(res => {
                console.log(res.data);
                if (res.data.status === 'success') {
                    props.login(registerInfo.email);
                    props.history.push(`/`);
                } else if (res.data.status === 'CONSTRAINT ERROR') {
                    alert('이미 존재하는 이메일입니다.');
                }
            });
    };
    React.useEffect(() => {
        if (
            registerInfo.password === registerInfo.check &&
            registerInfo.password !== ''
        ) {
            setIsEqualPassword(false);
        } else {
            if (registerInfo.password === '') {
                setIsEqualPassword(false);
            } else {
                setIsEqualPassword(true);
            }
        }
    }, [registerInfo.password, registerInfo.check]);
    React.useEffect(() => {
        if (
            isEmailWarn === false &&
            isEqualPassword === false &&
            registerInfo.password !== ''
        ) {
            setIsEnableBtn(true);
        } else {
            setIsEnableBtn(false);
        }
    }, [registerInfo.password, isEmailWarn, isEqualPassword]);
    React.useEffect(() => {
        if (validateEmail(registerInfo.email)) {
            setIsEmailWarn(false);
        } else {
            if (registerInfo.email === '') setIsEmailWarn(false);
            else setIsEmailWarn(true);
        }
    }, [registerInfo.email]);

    const handleEmailChange = e => {
        setRegisterInfo({ ...registerInfo, email: e.target.value });
    };
    const handlePasswordChange = e => {
        setRegisterInfo({ ...registerInfo, password: e.target.value });
    };
    const handleCheckPWChange = e => {
        setRegisterInfo({ ...registerInfo, check: e.target.value });
    };
    return (
        <Form onSubmit={handleRegisterSubmit}>
            <Title>회원 가입</Title>
            <label>Email</label>
            <Input
                type="text"
                placeholder="sample@email.com"
                value={registerInfo.email}
                onChange={handleEmailChange}
            />
            <Warning show={isEmailWarn}>
                {' '}
                ⚠이메일 형식이 잘못되었습니다.
            </Warning>
            <label>Password</label>
            <Input
                type="password"
                placeholder="******"
                value={registerInfo.password}
                onChange={handlePasswordChange}
            />
            <label>Password Check</label>
            <Input
                type="password"
                placeholder="******"
                value={registerInfo.check}
                onChange={handleCheckPWChange}
            />
            <Warning show={isEqualPassword}>
                {' '}
                ⚠비밀번호가 일치하지 않습니다.
            </Warning>
            <Button type="submit" enable={isEnableBtn}>
                Sign Up
            </Button>
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
    margin-bottom: 10px;
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
    background-color: ${props => (props.enable ? 'blue' : 'white')};
    color: ${props => (props.enable ? 'white' : 'gray')};
    border: 1px solid ${props => (props.enable ? 'blue' : 'gray')};
    border-radius: 3px;
    cursor: pointer;
    transition: box-shadow 0.2s;
    ${props =>
        props.enable
            ? `&:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 255, 0.7);
    }`
            : ''}
`;
const Warning = styled.p`
    display: 'block'
    margin: 10px 0px;
    background-color: rgba(128, 0, 0, 0.4);
    text-align: center;
    border-radius: 3px;
    opacity:${props => (props.show ? '1' : '0')};
`;
export default RegisterFormPresenter;
