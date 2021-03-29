import React from "react";
const CheckboxComp = (props) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={props.value}
        id={props.value}
        onChange={props.onChangeProps}
        name={props.name}
      />
      <label className="form-check-label" htmlFor={props.value}>
        {props.value}
      </label>
    </div>
  );
};

export default CheckboxComp;
