/**
 * Created by ken on 3/24/17.
 */
export const settingReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FILTER':
            return {
                filter: action.params,
            };
            
        case 'TOKEN':
            return {
                token: action.params,
            };

        default:
            return state;
    }
};

export const actionCreators = {
    setFilter: (value) => {
        return {
            type: 'FILTER',
            params: value,
        }
    },

    setToken: (token) => {
        return {
            type: 'TOKEN',
            params: token,
        }
    }
};