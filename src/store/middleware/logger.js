export function logger({ dispatch }) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // if (action.type === "task/update") {
            //     return dispatch({
            //         type: "task/remove",
            //         payload: { ...action.payload },
            //     });
            // }
            return next(action);
        };
    };
}
