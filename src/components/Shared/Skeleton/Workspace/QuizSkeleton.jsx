import "./QuizSkeleton.css";

function QuizSkeleton() {

    return (

        <div className="quiz-skeleton-container">

            <div className="quiz-skeleton-header">

                <div className="quiz-sk quiz-sk-title"></div>

                <div className="quiz-sk quiz-sk-progress"></div>

            </div>

            <div className="quiz-skeleton-card">

                <div className="quiz-sk quiz-sk-question-number"></div>

                <div className="quiz-sk quiz-sk-question"></div>

                <div className="quiz-sk quiz-sk-question medium"></div>

                <div className="quiz-skeleton-options">

                    <div className="quiz-sk quiz-sk-option"></div>

                    <div className="quiz-sk quiz-sk-option"></div>

                    <div className="quiz-sk quiz-sk-option"></div>

                    <div className="quiz-sk quiz-sk-option"></div>

                </div>

            </div>

            <div className="quiz-skeleton-footer">

                <div className="quiz-sk quiz-sk-btn"></div>

                <div className="quiz-sk quiz-sk-btn"></div>

            </div>

        </div>

    );

}

export default QuizSkeleton;