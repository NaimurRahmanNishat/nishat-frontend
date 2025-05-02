import { createRoot } from "react-dom/client";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
