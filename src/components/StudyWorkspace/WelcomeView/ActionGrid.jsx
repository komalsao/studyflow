import "./ActionGrid.css";
import {
    FileText,
    Layers3,
    CircleHelp,
    Network,
    ArrowRight
} from "lucide-react";

const actions = [
    {
        title: "Read Summary",
        description: "Get key insights and important points.",
        icon: FileText,
        view: "summary"
    },
    {
        title: "Practice Flashcards",
        description: "Revise concepts using flashcards.",
        icon: Layers3,
        view: "flashcards"
    },
    {
        title: "Attempt Quiz",
        description: "Test your knowledge with quizzes.",
        icon: CircleHelp,
        view: "quiz"
    },
    {
        title: "View Mind Map",
        description: "Visualize concepts and connections.",
        icon: Network,
        view: "mindmap"
    }
];

function ActionGrid({ setActiveView }) {

    return (

        <section className="action-section">

            <h2>Quick Actions</h2>

            <div className="action-grid">

                {actions.map((action) => {

                    const Icon = action.icon;

                    return (

                        <button
                            key={action.title}
                            className="action-card"
                            onClick={() => setActiveView(action.view)}
                        >

                            <Icon
                                size={42}
                                className="action-icon"
                            />

                            <h3>{action.title}</h3>

                            <p>{action.description}</p>

                            <ArrowRight
                                size={28}
                                className="action-arrow"
                            />

                        </button>

                    );

                })}

            </div>

        </section>

    );

}

export default ActionGrid;