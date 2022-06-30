import { createStore } from "redux";
import { taskReducer } from "./taskReducer";

const initialState = [
    { id: 1, title: "task 1", completed: false },
    { id: 2, title: "task 2", completed: false },
];

export function initiateStore() {
    return createStore(taskReducer, initialState);
}
