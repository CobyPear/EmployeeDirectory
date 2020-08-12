import React from 'react';

function Button(props) {
    return (
        <button
            className={`btn ml-2 ${props.className}`}
            onClick={props.handleFormSubmit}
        >
            {props.name}
        </button>
    );
};

export default Button;