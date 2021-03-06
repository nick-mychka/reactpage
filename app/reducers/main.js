import * as types from '../utils/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_PAGES:
            return Object.assign({}, state, {
                pages : action.pages
            });
        case types.GET_EVENTS:
            return Object.assign({}, state, {
                events : action.events
            });
    }
    return state;
};