const LOGIN = `auth/LOGIN`;
const LOGOFF = `auth/LOGOFF`;
const INVALID = `auth/INVALID`;

export const login = (SID, username) => {
    return {
        type: LOGIN,
        data: { SID, username }
    };
};
export const logoff = () => {
    return {
        type: LOGOFF
    };
};
export const invalid = () => {
    return {
        type: INVALID
    };
};
const initialState = {
    SID: '',
    username: '',
    valid: false
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                SID: action.data.SID,
                username: action.data.username,
                valid: true
            };
        case LOGOFF:
            return {
                SID: '',
                username: '',
                valid: false
            };
        case INVALID:
            return {
                SID: '',
                username: '',
                valid: false
            };
        default: {
            return state;
        }
    }
}
