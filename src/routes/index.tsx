import App from "@/App";
import Books from "@/pages/books";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
      {
        path: "/", // child route path (renders inside <Outlet /> in App)
        element: <Books/>,
      },
    ],
    },
]);

export default router;