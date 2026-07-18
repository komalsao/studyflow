import "./QuizView.css";

import React, { useState, useEffect } from "react";
import ResultScreen from "./ResultScreen";
import QuizHeader from "./QuizHeader";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import OptionCard from "./OptionCard";
import QuizStart from "./QuizStart";
import { ClockAlert } from "lucide-react";

function QuizView({ session }) {

    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [lives, setLives] = useState(3);
    const [lostHeart, setLostHeart] = useState(null);
    const QUESTION_TIME = 20;
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
    const [timeUp, setTimeUp] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [totalTime, setTotalTime] = useState(0);

    const questions = session?.resources?.quiz;

    useEffect(() => {

        if (!quizStarted || showResult || showAnswer) return;

        const timer = setInterval(() => {

            setTimeLeft(prev => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [quizStarted, showResult, showAnswer, currentQuestion]);

    useEffect(() => {

        if (timeLeft > 0) return;

        if (showAnswer) return;

        setTimeUp(true);

        setShowAnswer(true);

        loseLife();

    }, [timeLeft]);


    function finishQuiz() {

        const endTime = Date.now();

        setTotalTime(
            Math.floor((endTime - startTime) / 1000)
        );

        setShowResult(true);

    }


    function loseLife() {

        setLostHeart(lives);

        if (lives > 1) {

            setLives(prev => prev - 1);

        } else {

            setLives(0);

            const endTime = Date.now();

            setTotalTime(
                Math.floor((endTime - startTime) / 1000)
            );

            setTimeout(() => {

                finishQuiz();

            }, 500);

        }

        setTimeout(() => {

            setLostHeart(null);

        }, 450);

    }

    function handleNextQuestion() {

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(prev => prev + 1);

            setSelectedOption(null);

            setShowAnswer(false);

            setTimeLeft(QUESTION_TIME);

        } else {

            finishQuiz();

        }

    }

    function handleOptionSelect(option) {

        if (showAnswer) return;

        setSelectedOption(option);

        setShowAnswer(true);

        if (option === question.correctAnswer) {

            setScore(prev => prev + 1);

        } else {

            loseLife();

        }

    }

    if (!quizStarted) {

        return (

            <QuizStart
                topic={session.title}
                onStart={() => {

                    setStartTime(Date.now());

                    setQuizStarted(true);

                }}
            />

        );

    }
    if (!questions.length) {

        return (

            <div className="quiz-view">

                <div className="quiz-loading">

                    <h2>Generating Quiz...</h2>

                    <p>
                        Lumi is preparing personalized quiz questions for this study session.
                    </p>

                </div>

            </div>

        );

    }

    if (showResult) {

        return (

            <ResultScreen

                score={score}

                total={questions.length}

                lives={lives}

                totalTime={totalTime}

                onRestart={() => {

                    setCurrentQuestion(0);
                    setScore(0);
                    setLives(3);
                    setSelectedOption(null);
                    setShowAnswer(false);
                    setShowResult(false);

                    setTimeLeft(QUESTION_TIME);
                    setTimeUp(false);

                    setStartTime(Date.now());
                    setTotalTime(0);

                }}

            />

        );

    }

    const question = questions[currentQuestion];


    return (

        <div className="quiz-view">

            <QuizHeader
                lives={lives}
                lostHeart={lostHeart}
                time={timeLeft}
                currentQuestion={currentQuestion + 1}
                totalQuestions={questions.length}
            />

            <ProgressBar
                current={currentQuestion + 1}
                total={questions.length}
            />

            <QuestionCard
                question={question.question}
            />

            <div className="options-container">

                {question.options.map((option, index) => (

                    <OptionCard
                        key={index}
                        index={index}
                        option={option}
                        selected={selectedOption === option}
                        correct={
                            showAnswer &&
                            option === question.correctAnswer
                        }
                        wrong={
                            showAnswer &&
                            selectedOption === option &&
                            option !== question.correctAnswer
                        }
                        disabled={showAnswer}
                        onClick={() => handleOptionSelect(option)}
                    />
                ))}

            </div>
            <div className="quiz-actions">
                {showAnswer && (

                    <div className="quiz-explanation">

                        <h4>Explanation</h4>

                        <p>{question.explanation}</p>

                    </div>

                )}

                {showAnswer && (

                    <button

                        className="next-button"

                        onClick={() => {

                            setTimeUp(false);

                            handleNextQuestion();

                        }}

                    >

                        {currentQuestion === questions.length - 1

                            ? "Finish Quiz"

                            : "Continue →"}

                    </button>

                )}
                {timeUp && (

                    <div className="time-up-toast">

                        <ClockAlert size={26} />

                        <div>

                            <strong>Oops! Time ran out.</strong>

                            <span>Here's the correct answer.</span>

                        </div>

                    </div>

                )}
            </div>

        </div>

    );

}

export default QuizView;