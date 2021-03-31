
const initialState = { user: {} }

function auth(state = initialState, action) {
    switch (action.type) {
        case 'CONNECT':
            return {
                loggedIn: true,
                user: action.value['user_id'],
                token: action.value['token'],
                is_owner: action.value['is_owner'],
            };
        case 'DISCONNECT':
            return {
                loggedIn: false,
                user: null,
                token: null,
                is_owner: null
            };
        default:
            return state
    }
}

export default auth