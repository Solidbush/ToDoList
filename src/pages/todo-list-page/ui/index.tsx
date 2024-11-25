import {Result, Space, Spin} from "antd";
import {taskModel, TaskRow} from "../../../entities/task";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";

export const ToDoListPage = observer(() => {
    const {store: {getTaskList, isLoading, taskListError, taskList}} = taskModel;

    useEffect(() => {
        getTaskList({})
    }, [])

    if (taskListError) {
        return <Result title={taskListError}/>
    }
    return <Space>
        <p>filter</p>
        {isLoading ? (
            <Spin/>
        ) : (
            taskList.map((task) => {
                return (<TaskRow key={`task_${task.id}`} title={task.title} id={task.id}/>)
            })
        )

        }
    </Space>
})