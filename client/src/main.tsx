import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import PostList from "./routes/PostList";
import NewPost from "./routes/NewPost";

const browserRouter = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <PostList />,
        path: "/",
      },
      {
        element: <NewPost />,
        path: "/new",
      },
      {
        element: <NewPost />,
        path: "/:postId/edit",
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={browserRouter} />
  </StrictMode>
);
