import {QueryParams, Todo} from "../../../shared/api/todos/model.ts";
import {makeObservable, runInAction} from "mobx";
import {getTodo, getToDoById, updateTodo} from "../../../shared/api/todos";

class TaskStore {
    taskList: Todo[] = [];
    task?: Todo
    isLoading = false
    taskListError = ''
    taskError = ''
    isUpdateLoading = false

    constructor() {
        makeObservable(this);
    }

    getTaskList = async (params: QueryParams) => {
        try {
            this.isLoading = true;
            const data = await getTodo(params);
            runInAction(() => {
                this.isLoading = false;
                this.taskList = data;
            })
        } catch (error) {
            if (error instanceof Error) {
                runInAction(() => {
                    this.isLoading = false;
                    this.taskListError = error.message;
                })
            }
        }
    }

    getTask = async (id: number) => {
        try {
            this.isLoading = true;
            const data = await getToDoById(id);
            runInAction(() => {
                this.isLoading = false;
                this.task = data;
            })
        } catch (error) {
            if (error instanceof Error) {
                runInAction(() => {
                    this.isLoading = false;
                    this.taskError = error.message;
                })
            }
        }
    }

    updateToDo = async (todo: Todo) => {
        try {
            this.isUpdateLoading = true;
            const data = await updateTodo(todo);
            runInAction(() => {
                this.isUpdateLoading= false;
                this.task = data;
            })
        } catch (error) {
            if (error instanceof Error) {
                runInAction(() => {
                    this.isUpdateLoading = false;
                    throw error
                })
            }
        }
    }
}

export const store = new TaskStore();