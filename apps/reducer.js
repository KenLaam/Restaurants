/**
 * Created by ken on 3/24/17.
 */
export const settingReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SLIDER':
            return {
                minStars: action.payload,
            }

        default:
            return state;
    }
};

export const actionCreators = {
    setMinStars: (value) => {
        return {
            type: 'SLIDER',
            payload: value,
        }
    }
}