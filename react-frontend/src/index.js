import React from "react";
<<<<<<< HEAD
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
=======
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp";
import "./index.css";

// create the containtner
const container = document.getElementById("root");
>>>>>>> 8545870 (slowly implementing landing page)

// create a root
const root = ReactDOMClient.createRoot(container);

// intial render: Render an element to the Root
root.render(<MyApp />);
