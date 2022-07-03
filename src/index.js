import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
    titleChanged,
    taskDeleted,
    tasksReset,
    completeTask,
    loadTasks,
    getTasks,
    getTasksLoadingStatus,
    createTask,
} from "./store/task";
import createStore from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";

const store = createStore();

const App = () => {
    const [taskData, setTaskData] = useState({
        title: "",
        completed: false,
    });
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getError());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadTasks());
    }, []);
    const handleChange = (evt) => {
        evt.preventDefault();
        setTaskData((prevState) => ({ ...prevState, title: evt.target.value }));
    };
    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };
    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };
    const resetTasks = () => {
        dispatch(tasksReset());
    };
    if (isLoading) {
        return <p>loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
            <h1>App</h1>
            <input placeholder="enter title here" onChange={handleChange} />
            <button onClick={() => dispatch(createTask(taskData))}>Post task</button>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>Change status</button>
                        <button onClick={() => changeTitle(el.id)}>Change title</button>
                        <button onClick={() => deleteTask(el.id)}>Delete task</button>
                        <hr />
                    </li>
                ))}
            </ul>
            <button onClick={resetTasks}>Reset</button>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
