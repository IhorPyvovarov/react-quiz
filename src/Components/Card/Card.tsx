import React from 'react';

type CardType = {
    children: React.ReactNode,
    questionID?: string
}

function Card({children, questionID}: CardType ) {
    return (
        <section className='card' data-q-id={questionID}>
            {children}
        </section>
    );
}

export default Card;