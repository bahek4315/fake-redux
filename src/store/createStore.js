export function createStore(reducer, initialState) {
    let state = initialState;
    let listeners = [];
    function getState() {
        return state;
    }
    function dispatch(action) {
        state = reducer(state, action);
        for (let listener of listeners) {
            listener();
        }
    }
    function subscribe(listener) {
        listeners.push(listener);
    }
    return { getState, dispatch, subscribe };
}
