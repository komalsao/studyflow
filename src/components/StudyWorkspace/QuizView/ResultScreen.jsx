import "./QuizView.css";

import {
    Trophy,
    Star,
    Heart,
    RotateCcw
} from "lucide-react";

import StudyLumi from "../../../assets/lumi/celebrating.png";

function ResultScreen({

    score,

    total,

    lives,

    totalTime,

    onRestart

}) {
    const accuracy = Math.round((score / total) * 100);

    const stars = Math.round((accuracy / 100) * 5);

    const minutes = Math.floor(totalTime / 60);

    const seconds = totalTime % 60;

    let message = "";

    if (accuracy >= 90) {

        message = "Outstanding work!";

    }

    else if (accuracy >= 75) {

        message = "Great job!";

    }

    else if (accuracy >= 50) {

        message = "Nice attempt!";

    }

    else {

        message = "Keep practicing. You'll improve!";
    }
    return (

        <div className="result-screen">

            <div className="result-card">

                <Trophy
                    size={64}
                    className="result-trophy"
                />

                <h1>Quiz Complete!</h1>

                <p className="result-subtitle">

                    {message}

                </p>

                <div className="result-stat">

                    <span>Accuracy</span>

                    <strong>{accuracy}%</strong>

                </div>

                <div className="result-stat">

                    <span>Correct Answers</span>

                    <strong>{score} / {total}</strong>

                </div>

                <div className="accuracy-bar">

                    <div
                        className="accuracy-fill"
                        style={{ width: `${accuracy}%` }}
                    />

                </div>

                <div className="stars">

                    {[1, 2, 3, 4, 5].map((i) => (

                        <Star

                            key={i}

                            size={22}

                            fill={i <= stars ? "#F6C453" : "transparent"}

                            color={i <= stars ? "#F6C453" : "#D9D9D9"}

                        />

                    ))}


                </div>

                <div className="result-info">

                    <div>

                        <Heart

                            size={18}

                            fill="#E76F51"

                            color="#E76F51"

                        />

                        <span>{lives} Lives Left</span>

                    </div>

                    <div>

                        ⏱ {minutes}m {seconds}s

                    </div>

                </div>

                <div className="result-lumi">
                    <p>

                        Think you can do even better? Let’s find out!

                    </p>

                    <img

                        src={StudyLumi}

                        alt="Lumi"

                    />



                </div>

                <button className="play-again"

                    onClick={onRestart}
                >

                    <RotateCcw size={18} />

                    Play Again

                </button>

            </div>

        </div>

    );

}

export default ResultScreen;