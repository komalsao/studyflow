import "./FlashcardsView.css";
import lumi from "../../../assets/lumi/peek.png";
import { useEffect, useState } from "react";

const flashcards = [
    {
        id: 1,
        question: "What is Memory Management?",
        answer: "Memory management is responsible for allocating, tracking and optimizing memory usage."
    },
    {
        id: 2,
        question: "What is Paging?",
        answer: "Paging divides logical memory into pages and physical memory into frames."
    },
    {
        id: 3,
        question: "What is Thrashing?",
        answer: "Thrashing occurs when the CPU spends more time swapping pages than executing processes."
    },
    {
        id: 4,
        question: "What is Virtual Memory?",
        answer: "Virtual memory allows programs to use more memory than physically available."
    }
];

function FlashcardsView({ setActiveView }) {

    const [cards, setCards] = useState(flashcards);

    const [showAnswer, setShowAnswer] = useState(false);

    const [isAnimating, setIsAnimating] = useState(false);

    const [completed, setCompleted] = useState(0);

    const currentCard = cards[0];
    const secondCard = cards[1];
    const thirdCard = cards[2];

    const progress = (completed / flashcards.length) * 100;

    function handleCardClick() {

        if (isAnimating) return;

        if (!showAnswer) {

            setShowAnswer(true);

            return;
        }

        setIsAnimating(true);

        setTimeout(() => {

            setCards(prev => {

                const updated = [...prev];

                updated.push(updated.shift());

                return updated;

            });

            setCompleted(prev =>
                Math.min(prev + 1, flashcards.length)
            );

            setShowAnswer(false);

            setIsAnimating(false);

        }, 500);

    }


    useEffect(() => {

        if (completed === flashcards.length) return;

        function handleKeyDown(event) {

            if (event.code !== "Space") return;

            event.preventDefault();

            handleCardClick();

        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {

            window.removeEventListener("keydown", handleKeyDown);

        };

    }, [showAnswer, isAnimating, completed, cards]);


    function restartCards() {

        setCards(flashcards);

        setCompleted(0);

        setShowAnswer(false);

    }

    if (completed === flashcards.length) {

        return (

            <div className="flashcards-view">

                <div className="completion-card-wrapper">

                    {/* Lumi */}

                    <img
                        src={lumi}
                        alt="Lumi"
                        className="completion-lumi"
                    />

                    <div className="completion-card">

                        <div className="completion-content">

                            <h1>

                                Great Job!

                            </h1>

                            <p>

                                You completed all{" "}

                                <strong>

                                    {flashcards.length} flashcards

                                </strong>

                                {" "}for{" "}

                                <strong>

                                    Memory Management

                                </strong>

                                .

                            </p>

                            <p className="completion-message">

                                You're making amazing progress!

                            </p>

                        </div>

                        <div className="completion-actions">

                            <button
                                onClick={restartCards}
                            >

                                Review Again

                            </button>

                            <button
                                onClick={() => setActiveView("summary")}
                            >

                                Back to Summary

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        );

    }

    return (

        <div className="flashcards-view">

            {/* Decorative Background */}

            <div className="bg-card bg-card-1" />

            <div className="bg-card bg-card-2" />

            <div className="bg-card bg-card-3" />

            <div className="bg-card bg-card-4" />

            {/* Header */}

            <div className="flashcards-header">

                <h1>

                    Flashcards

                </h1>

                <h3>

                    Memory Management

                </h3>

                <div className="progress-wrapper">

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>

                    <span>

                        {completed} / {flashcards.length} Cards

                    </span>

                </div>

            </div>

            {/* Stack */}

            <div className={`flashcards-stack ${isAnimating ? "animating" : ""}`}>

                {thirdCard && (

                    <div className="stack-card third">

                        <span>

                            {thirdCard.question}

                        </span>

                    </div>

                )}

                {secondCard && (

                    <div className="stack-card second">

                        <span>

                            {secondCard.question}

                        </span>

                    </div>

                )}

                <div
                    className={`flashcard
                        ${showAnswer && !isAnimating ? "show-answer" : ""}
                        ${isAnimating ? "moving" : ""}
                    `}
                    onClick={handleCardClick}
                >

                    <div className="flashcard-inner">

                        <div className="flashcard-front">

                            <p>

                                Question

                            </p>

                            <h2>

                                {currentCard.question}

                            </h2>

                        </div>

                        <div className="flashcard-back">

                            <p>

                                Answer

                            </p>

                            <h2>

                                {currentCard.answer}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="flashcard-footer">

                <p>

                    {showAnswer
                        ? "Tap again for next card"
                        : "Tap card to reveal answer"}

                </p>

                <span>

                    Click / Tap Card

                </span>

            </div>

        </div>

    );

}

export default FlashcardsView;