import "./SummaryView.css";

import {
    BookOpen,
    BrainCircuit,
    ChevronDown,
    ChevronRight,
    MessageCircleMore,
    Sparkles,
    Zap
} from "lucide-react";

function SummaryView({ session }) {

    const overview = session?.resources?.overview;

    const topics = session?.resources?.topics || [];

    const mainTopic = topics[0];

    const remainingTopics = topics.slice(1);

    if (!session?.resources) {

        return (
            <div className="summary-view">
                <div className="summary-layout">
                    <div className="paper">
                        <div className="paper-content">
                            <h2>Generating Summary...</h2>
                            <p>
                                Lumi is reading your study material and preparing
                                your personalized summary.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    return (

        <div className="summary-view">

            <div className="summary-layout">

                {/* LEFT */}

                <div className="paper">

                    <div className="paper-content">

                        {/* OVERVIEW */}

                        <section className="summary-overview">

                            <div className="overview-text">

                                <h2>

                                    <BookOpen size={22} />

                                    {overview?.title || "Quick Overview"}

                                </h2>

                                <p>

                                    {overview?.summary}

                                </p>

                                {overview?.learningObjectives?.length > 0 && (

                                    <ul className="learning-objectives">

                                        {overview.learningObjectives.map((objective, index) => (

                                            <li key={index}>

                                                {objective}

                                            </li>

                                        ))}

                                    </ul>

                                )}

                            </div>

                            <div className="overview-illustration">

                                <BookOpen
                                    size={92}
                                    strokeWidth={1.3}
                                />

                            </div>

                        </section>

                        {/* MAIN TOPIC */}

                        {mainTopic && (

                            <section className="summary-topic expanded">

                                <div className="topic-header">

                                    <div className="topic-title">

                                        <ChevronDown size={18} />

                                        <h3>

                                            {mainTopic.title}

                                        </h3>

                                    </div>

                                </div>

                                <div className="topic-body">

                                    <p>

                                        {mainTopic.summary}

                                    </p>

                                    {mainTopic.keyPoints?.length > 0 && (

                                        <ul>

                                            {mainTopic.keyPoints.map((point, index) => (

                                                <li key={index}>

                                                    {point}

                                                </li>

                                            ))}

                                        </ul>

                                    )}

                                </div>

                                <div className="topic-divider" />

                                <button className="explore-topic">

                                    <Sparkles size={18} />

                                    Explore This Topic

                                </button>

                            </section>

                        )}

                        {/* OTHER TOPICS */}

                        {remainingTopics.map((topic, index) => (

                            <section
                                key={index}
                                className="summary-topic collapsed"
                            >

                                <ChevronRight size={18} />

                                <span>

                                    {topic.title}

                                </span>

                            </section>

                        ))}

                    </div>

                </div>

                {/* RIGHT */}

                <aside className="notes">

                    {/* MEMORY TRICK */}

                    <div className="note yellow">

                        <h3>

                            <BrainCircuit size={18} />

                            Memory Trick

                        </h3>

                        <div className="note-content">

                            <p>

                                {mainTopic?.memoryTrick?.title}

                            </p>

                            <p>

                                {mainTopic?.memoryTrick?.content}

                            </p>

                        </div>

                    </div>

                    {/* REVISION */}

                    <div className="note blue">

                        <h3>

                            <Zap size={18} />

                            Quick Revision

                        </h3>

                        <div className="note-content">

                            <div className="revision-tags">

                                {mainTopic?.revisionTags?.map((tag, index) => (

                                    <span key={index}>

                                        {tag}

                                    </span>

                                ))}

                            </div>

                        </div>

                    </div>

                    {/* CONTINUE */}

                    <div className="note purple">

                        <h3>

                            <MessageCircleMore size={18} />

                            Continue with Lumi

                        </h3>

                        <div className="note-content">

                            {mainTopic?.continueWithLumi?.map((question, index) => (

                                <button key={index}>

                                    {question}

                                </button>

                            ))}

                        </div>

                    </div>

                </aside>

            </div>

        </div>

    );

}

export default SummaryView;