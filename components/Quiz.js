import React from 'react';

export default function Quiz(props)
{
    function styler(option, OptionIndex)
    {
        if(props.showAnswers === true)
        {
            if(props.question.correct_answer === option)
            {
                return({backgroundColor: "#94D7A2"})
            }
            else if(props.question.correct_answer === OptionIndex)
            {
                return({backgroundColor: "#F8BCBC"})
            }
            else
            {
                return({backgroundColor: "#F5F7FB"})
            }
        }
        else
        {
            return(props.question.selected_answer === OptionIndex 
                ? 
                    {backgroundColor: "#D6DBF5"}
                : 
                    {backgroundColor: "#F5F7FB"});
        }
    }

    const options = props.question.options
                         .map((option, OptionIndex)=>{
                            return (
                                <button 
                                    key={OptionIndex}
                                    
                                    dangerouslySetInnerHTML={{__html: option}}
                                    onClick={() => props.selectAnswer(props.id, OptionIndex)}
                                    style={styler(option, OptionIndex)}
                                    
                                    disabled={props.showAnswers}
                                    className="quiz-container-question-options-container-option"
                                />
                            );
                         })

    return (
        <main>
            <div className="quiz-container-question">
                <h3
                    className="quiz-container-question-title"
                    dangerouslySetInnerHTML={{__html: props.question.question}}
                />
                <div className="quiz-container-question-options-container">{options}</div>
                <br />
            </div>
        </main>
    );
}
