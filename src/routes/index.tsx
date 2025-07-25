import App from "@/App";
import AddBookPage from "@/pages/AddBookModal";

import Books from "@/pages/books";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
      {
        path: "/", 
        element: <Books/>,
      },
      {
        path: "/addBooks", 
        element:  <AddBookPage/>,
      },
      {
        path: "/borrowSummary", 
        element:  <BorrowSummaryPage/>,
      },
    ],
    },
]);

export default router;