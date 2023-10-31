import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp";
import "./index.css";

// create the containtner
const container = document.getElementById("root");

// create a root
const root = ReactDOMClient.createRoot(container);

// intial render: Render an element to the Root
root.render(<MyApp />);
