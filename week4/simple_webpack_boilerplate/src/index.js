import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
  const name = "Kurt Wonnegut";
  setTimeout(() => alert(`Hello there from ${name}`), 1000);
  return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));
