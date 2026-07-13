import { Clock3 } from "lucide-react";

function QuizTimer({ time }) {

    return (

        <div className="quiz-timer">

            {time}s
            <div

                className={`quiz-timer ${time <= 10 ? "warning" : ""}`}

            ></div>

        </div>

    );

}

export default QuizTimer;