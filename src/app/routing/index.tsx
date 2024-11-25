import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../../shared/ui/main-layout";
import {ToDoListPage} from "../../pages/todo-list-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <ToDoListPage />
            },
            {
                path: ":id",
                element: <>todo detail</>
            }
        ]
    }
])