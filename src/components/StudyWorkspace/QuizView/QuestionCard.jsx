import { Brain } from "lucide-react";
function QuestionCard({ question }) {

    return (

        <div className="question-card">

            <div className="question-label">

                <Brain size={16} />

                <span>Question</span>

            </div>

            <h2>

                {question}

            </h2>

        </div>

    );

}

export default QuestionCard;