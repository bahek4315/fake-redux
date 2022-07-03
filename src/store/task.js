import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todosService";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        set(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        add(state, action) {
            state.entities.unshift(action.payload);
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex((el) => el.id === action.payload.id);
            state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload };
        },
        remove(state, action) {
            state.entities = state.entities.filter((el) => el.id !== action.payload.id);
        },
        reset() {
            return initialState;
        },
        taskRequested(state) {
            state.isLoading = true;
        },
    },
});

const { update, remove, reset, set, taskRequested, add } = taskSlice.actions;
const taskReducer = taskSlice.reducer;

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.fetch();
        dispatch(set(data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const completeTask = (id) => (dispatch, getState) => {
    dispatch(update({ id, completed: true }));
};

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export const createTask = (task) => async (dispatch) => {
    try {
        const data = await todosService.post(task);
        console.log(data);
        dispatch(add(data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export function titleChanged(id) {
    return update({ id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
    return remove({ id });
}
export function tasksReset() {
    return reset(initialState);
}

export default taskReducer;
