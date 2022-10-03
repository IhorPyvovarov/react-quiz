import React from 'react';

type ButtonType = {
    onClickHandler: (e: React.MouseEvent) => void,
    text: string
}

function Button({onClickHandler, text}: ButtonType) {
    return (
        <button onClick={(e) => onClickHandler(e)} type='button' className='btn'>
            {text}
        </button>
    );
}

export default Button;