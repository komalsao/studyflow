import "./QuizView.css";

import {
    FileQuestion,
    Heart,
    Clock3,
    ArrowRight
} from "lucide-react";

import StudyLumi from "../../../assets/lumi/startquiz.png";

function QuizStart({
    topic,
    totalQuestions,
    lives,
    onStart
}) {

    const estimatedMinutes = Math.max(
        1,
        Math.ceil((totalQuestions * 20) / 60)
    );

    return (

        <div className="quiz-start">

            <div className="quiz-start-content">

                <h1>

                    Ready to Challenge Yourself?

                </h1>

                <p className="quiz-subtitle">

                    Test your understanding of{" "}

                    <span>

                        {topic}

                    </span>

                    {" "}with{" "}

                    <strong>

                        {totalQuestions}

                    </strong>

                    {" "}questions.

                </p>

                <div className="quiz-divider"></div>

                <div className="quiz-stats">

                    <div className="quiz-stat-inline">

                        <FileQuestion
                            size={26}
                            color="#5F9E73"
                        />

                        <div>

                            <strong>

                                {totalQuestions}

                            </strong>

                            <span>

                                Questions

                            </span>

                        </div>

                    </div>

                    <div className="quiz-stat-inline">

                        <Heart
                            size={26}
                            fill="#EF6B5A"
                            color="#EF6B5A"
                        />

                        <div>

                            <strong>

                                {lives}

                            </strong>

                            <span>

                                Lives

                            </span>

                        </div>

                    </div>

                    <div className="quiz-stat-inline">

                        <Clock3
                            size={26}
                            color="#E6A93C"
                        />

                        <div>

                            <strong>

                                ~{estimatedMinutes} min

                            </strong>

                            <span>

                                Approx.

                            </span>

                        </div>

                    </div>

                </div>

                <div className="quiz-divider"></div>

                <img
                    src={StudyLumi}
                    className="quiz-start-lumi"
                    alt="Lumi"
                />

                <button
                    className="start-quiz-button"
                    onClick={onStart}
                >

                    Start Quiz

                    <ArrowRight size={20} />

                </button>

            </div>

        </div>

    );

}

export default QuizStart;