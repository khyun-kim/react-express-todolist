const LOGIN = `auth/LOGIN`;
const LOGOFF = `auth/LOGOFF`;

export const login = email => {
    return {
        type: LOGIN,
        data: { email }
    };
};
export const logoff = () => {
    return {
        type: LOGOFF
    };
};
const initialState = {
    email: ''
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                email: action.data.email
            };
        case LOGOFF:
            return {
                email: ''
            };
        default: {
            return state;
        }
    }
}
