import {Result, Space, Spin} from "antd";
import {taskModel, TaskRow} from "../../../entities/task";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {ToggleTask} from "../../../features/toggle-task";
import {TaskFilter} from "../../../features/task-filter";

export const ToDoListPage = observer(() => {
    const {store: {getTaskList, isLoading, taskListError, taskList}} = taskModel;

    useEffect(() => {
        getTaskList({})
    }, [])

    if (taskListError) {
        return <Result title={taskListError}/>
    }
    return <Space direction="vertical">
        <TaskFilter onChange={getTaskList} />
        {isLoading ? (
            <Spin/>
        ) : (
            taskList.map((task) => {
                return (<TaskRow key={`task_${task.id}`} title={task.title} id={task.id} action={<ToggleTask todo={task} />}/>)
            })
        )

        }
    </Space>
})