import Lives from "./Lives";
import QuizTimer from "./Timer";

function QuizHeader({

    lives,
    lostHeart,
    time,
    currentQuestion,
    totalQuestions

}) {

    return (

        <div className="quiz-header">

            <div className="quiz-top">

                <Lives

                    lives={lives}

                    lostHeart={lostHeart}

                />

                <QuizTimer time={time} />

            </div>

            <div className="quiz-question-counter">

                Question {currentQuestion} / {totalQuestions}

            </div>

        </div>

    );

}

export default QuizHeader;