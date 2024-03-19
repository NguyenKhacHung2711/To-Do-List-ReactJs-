import React from "react";

function Button({id, onClick, title }) {
    return (
      <button 
        id={id}
        className="addBtn"
        onClick={onClick}
      >{title}</button>
    );
  }


export default Button;