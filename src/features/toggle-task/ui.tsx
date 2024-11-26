import {Checkbox, Spin} from "antd";
import { taskModel } from "../../entities/task"
import {Todo} from "../../shared/api/todos/model.ts";

type Props = {
    todo: Todo
}
export const ToggleTask = ({ todo }: Props) => {
    const { store: { updateToDo, isUpdateLoading }} = taskModel;

    return isUpdateLoading ? (
        <Spin />
    ) : (
        <Checkbox onChange={(val) => updateToDo({...todo, completed: val.target.checked})}/>
    )
}