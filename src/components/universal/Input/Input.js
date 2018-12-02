import React from "react";
import "./Input.scss";

const Input = props => {

    const type = props.type || "text";
    const errorMessage = props.errorMessage || "error";
    const cls = ["input-cont"];
    if (!props.valid) {
        cls.push("invalid");
    }

    return (
        <div className={cls.join(" ")}>
            <div>
                {props.label && <label htmlFor={props.id}>{props.label}</label>}
                <input
                    className={props.className}
                    type={type}
                    value={props.value}
                    placeholder={props.placeholder}
                    id={props.id}
                    onChange={props.changeHandler}
                />
            </div>
            {!props.valid && <span>{errorMessage}</span>}
        </div>
    );
};

export default Input;
