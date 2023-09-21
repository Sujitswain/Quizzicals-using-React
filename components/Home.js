import React from 'react';

export default function Quizzical(props)
{
    return(
        <div className="home">
            <h1>Quizzical</h1>
            <h2>Test your brain by solving Objective Questions</h2>
            <button onClick={props.startQuiz}>Start Quiz</button>
        </div>
    );
}
