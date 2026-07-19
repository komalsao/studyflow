import "./FlashcardsView.css";
import lumi from "../../../assets/lumi/peek.png";
import { useEffect, useRef, useState } from "react";
import { askLumi } from "../../../services/askLumi";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { updateProgress } from "../../../services/progressService";
import FlashcardsSkeleton from "../../Shared/Skeleton/Workspace/FlashcardsSkeleton";

function FlashcardsView({ session, setActiveView, onProgressUpdate }) {
    const navigate = useNavigate();

    const flashcards = session?.resources?.flashcards;

    const [cards, setCards] = useState([]);

    const [showAnswer, setShowAnswer] = useState(false);

    const [isAnimating, setIsAnimating] = useState(false);

    const [completed, setCompleted] = useState(0);
    const markedSessionId = useRef(null);

    useEffect(() => {

        if (!flashcards) return;

        setCards(flashcards);

        setCompleted(0);

        setShowAnswer(false);

    }, [flashcards]);

    const currentCard = cards[0];

    const secondCard = cards[1];

    const thirdCard = cards[2];

    const progress =
        flashcards.length > 0
            ? (completed / flashcards.length) * 100
            : 0;

    useEffect(() => {
        if (
            !session?.id ||
            !flashcards?.length ||
            completed !== flashcards.length ||
            session.progress?.flashcards ||
            markedSessionId.current === session.id
        ) return;

        markedSessionId.current = session.id;
        updateProgress(session.id, "flashcards")
            .then(() => onProgressUpdate?.("flashcards"))
            .catch((error) => {
                markedSessionId.current = null;
                console.error("Unable to update flashcard progress:", error);
            });
    }, [completed, flashcards?.length, session?.id, session?.progress?.flashcards]);

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

    }, [
        showAnswer,
        isAnimating,
        completed,
        cards,
        flashcards.length,
    ]);

    function restartCards() {

        setCards(flashcards);

        setCompleted(0);

        setShowAnswer(false);

    }

    if (!flashcards) {
        return <FlashcardsSkeleton />;
    }

    if (completed === flashcards.length) {

        return (

            <div className="flashcards-view">

                <div className="completion-card-wrapper">

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

                                    {session?.title}

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
                                onClick={() => setActiveView("quiz")}
                            >
                                Try Quiz
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

                    {session?.title}

                </h3>

                <div className="flash-progress-wrapper">

                    <div className="progress-bar">

                        <div
                            className="flash-progress-fill"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                    <span>

                        {completed} / {flashcards.length} Cards

                    </span>

                </div>

            </div>

            {/* Stack */}

            <div
                className={`flashcards-stack ${isAnimating ? "animating" : ""
                    }`}
            >

                {thirdCard && (

                    <div className="stack-card third">

                        <span>

                            {thirdCard?.question}

                        </span>

                    </div>

                )}

                {secondCard && (

                    <div className="stack-card second">

                        <span>

                            {secondCard?.question}

                        </span>

                    </div>

                )}

                {currentCard && (

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

                                    {currentCard?.question}

                                </h2>

                            </div>

                            <div className="flashcard-back">

                                <p>

                                    Answer

                                </p>

                                <h2>

                                    {currentCard?.answer}

                                </h2>

                            </div>

                        </div>

                    </div>

                )}

            </div>

            {/* Footer */}

            <div className="flashcard-footer">

                <p>

                    {showAnswer
                        ? "Tap again for the next flashcard."
                        : "Tap the card to reveal the answer."}

                </p>

                <div
                    className="explain-lumi"
                    onClick={() =>
                        askLumi({
                            navigate,
                            sessionId: session.id,
                            setActiveView,
                            prompt: `Explain "${currentCard.question}" in detail using my uploaded study material.`,
                        })
                    }
                >

                    <span>Dive Deeper</span>

                    <ArrowRight size={18} />

                </div>

            </div>

        </div>

    );

}

export default FlashcardsView;
