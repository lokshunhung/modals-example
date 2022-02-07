import "./index.css";
import { render } from "react-dom";
import ReactModal from "react-modal";
import { App } from "./App";

ReactModal.setAppElement("#root");

const element = <App />;

const container = document.querySelector("#root");

render(element, container);
