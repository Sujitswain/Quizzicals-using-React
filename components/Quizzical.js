import './style.css'
import React from 'react';

import Home from './Home'
import Quiz from './Quiz';

export default function Quizzical()
{
    const[showHome, setShowHome] = React.useState(true)
    const[questions, setQuestions] = React.useState([])
    const[showAnswers, setShowAnswers] = React.useState(false)
    const[allComplete, setAllComplete] = React.useState(false)
    const[score, setScore] = React.useState(0)

    // show the quiz question
    function startQuiz()
    {
        setShowHome(false)
    }

    // make the selected answer which the user 
    // has selected
    function selectAnswer(quest_id, option_id)
    {
        setQuestions(()=>{
            return(
                questions.map((quest, qid)=>{
                    return(
                        quest_id === qid 
                        ? 
                            {...quest, selected_answer: option_id} 
                        : 
                            quest
                    );
                })
            );
        })
    }

    // when the check answer button is clicked
    // show all the answer
    function checkAnswers()
    {
        setShowAnswers(true)
    }

    // reset to the home page and set 
    // showAnswer and allComplete to false
    function playAgain()
    {
        setShowHome(true)
        setShowAnswers(false)
        setAllComplete(false)
    }

    // run a function to increase the 
    // score when the selected answer 
    // matches the correct answer
    React.useEffect(()=>{
        var count = 0;
        for(var i=0; i<questions.length; i++)
        {
            if(typeof questions[i].selected_answer != undefined)
            {
                if(questions[i].options[questions[i].selected_answer] 
                    === questions[i].correct_answer)
                {
                    count = count + 1
                }
            }
        }
        setScore(count)
    }, [showAnswers])

    // collect 5 questions from the api and 
    // call the setQuestions method to store
    // all the question in the array
    React.useEffect(() =>{
        if(showHome === false)
        {
            fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuestions(data.results.map(question => {
                return({

                    question: question.question,
                    options: question.incorrect_answers
                                .concat([question.correct_answer])
                                .map(value=>({
                                    value,
                                    random: Math.random()
                                }))
                                .sort((a,b) => a.random - b.random)
                                .map(a => a.value),
                    selected_answer: undefined,
                    correct_answer: question.correct_answer
                });
            })))
        }
    }, [showHome])

    // check all questions whether the options 
    // are selected or not, if all answer is 
    // selected the set allComplete to true
    React.useEffect(()=>{
        setAllComplete(questions
                        .every( q => {
                            return (
                                typeof q.selected_answer != 'undefined'
                            );
                        }))
    }, [questions])

    // display all the quiz questions
    const questionElemets = questions.map((question, index)=>{
        return(
            <Quiz
                key={index}
                question={question}
                showAnswers={showAnswers}
                selectAnswer={selectAnswer}
                id={index}
            />
        );
    })

    return(
        <main>
            <div>
                <div className="top-design"></div>
                <div className="bottom-design"></div>
            </div>

            {showHome 
                ?
                    <Home startQuiz={startQuiz}/>
                :
                    <div className='quiz-container'>
                        {questionElemets}
                        {
                            showAnswers
                            ?
                                <div className='button-container'>
                                    <h3 className='button-container-score'>{"You scored " + score + "/5 correct answers"}</h3>
                                    <button className='button' onClick={playAgain}>Play Again</button>
                                </div>
                            :
                                <button className='button' disabled={!allComplete} onClick={checkAnswers}>Check Answers</button>
                        }
                    </div>
            }

        </main>
    );
}
