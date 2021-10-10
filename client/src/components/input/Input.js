import React from "react";
import "./input.scss"

export default function Input({type, placeHolder, value, setValue}) {
    return (
        <input
            onChange={(event) => setValue(event.target.value)} type={type} placeholder={placeHolder} value={value}
        />
    );
}
