import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";

const initialState = [
    { id: 1, title: "task 1", completed: false },
    { id: 2, title: "task 2", completed: false },
];

const store = initiateStore();

const App = () => {
    const [state, setState] = useState(store.getState());
    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState());
        });
    }, []);
    const completeTask = (taskId) => {
        store.dispatch(actions.taskCompleted(taskId));
    };
    const changeTitle = (taskId) => {
        store.dispatch(actions.titleChanged(taskId));
    };
    const deleteTask = (taskId) => {
        store.dispatch(actions.taskDeleted(taskId));
    };
    const clearState = () => {
        setState(initialState);
    };
    return (
        <>
            <h1>App</h1>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        <button onClick={() => completeTask(el.id)}>Click me</button>
                        <button onClick={() => changeTitle(el.id)}>Change title</button>
                        <button onClick={() => deleteTask(el.id)}>Delete task</button>
                        <hr />
                    </li>
                ))}
            </ul>
            <button onClick={clearState}>Clear</button>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
