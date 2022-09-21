//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Todo from "./component/Todo.jsx";

//render your react application
ReactDOM.render(<Todo />, document.querySelector("#app"));
