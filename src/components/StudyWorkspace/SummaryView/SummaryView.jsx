import "./SummaryView.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    BookOpen,
    BrainCircuit,
    ChevronDown,
    ChevronRight,
    MessageCircleMore,
    Sparkles,
    Zap
} from "lucide-react";
import { askLumi } from "../../../services/askLumi";
import { updateProgress } from "../../../services/progressService";
import SummarySkeleton from "../../Shared/Skeleton/Workspace/SummarySkeleton";

function SummaryView({ session, onProgressUpdate }) {

    const navigate = useNavigate();
    const { sessionId } = useParams();
    const [expandedTopicIndex, setExpandedTopicIndex] = useState(0);
    const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
    const markedSessionId = useRef(null);

    const overview = session?.resources?.overview;
    const topics = session?.resources?.topics || [];
    const expandedTopic = topics[expandedTopicIndex] || null;

    useEffect(() => {
        if (!session?.id || session.progress?.summary || markedSessionId.current === session.id) return;

        markedSessionId.current = session.id;
        updateProgress(session.id, "summary")
            .then(() => onProgressUpdate?.("summary"))
            .catch((error) => {
                markedSessionId.current = null;
                console.error("Unable to update summary progress:", error);
            });
    }, [session?.id, session?.progress?.summary]);

    const handleAskLumi = (prompt) => {

        askLumi({
            navigate,
            sessionId: session?.id || sessionId,
            prompt,
        });

    };

    const handleTopicToggle = (index) => {

        setExpandedTopicIndex((currentIndex) =>
            currentIndex === index ? null : index
        );

    };

    if (!session?.resources?.overview) {
    return <SummarySkeleton />;
}

    return (

        <div className="summary-view">

            <div className="summary-layout">

                <div className="paper">

                    <div className="paper-content">

                        <section className="summary-overview">

                            <div className="overview-text">

                                <h2>

                                    <BookOpen size={22} />

                                    {overview?.title}

                                </h2>

                                <div className="overview-summary-content">

                                    <p className={isOverviewExpanded ? "" : "overview-preview"}>

                                        {overview?.summary}

                                    </p>

                                    {isOverviewExpanded && overview?.learningObjectives?.length > 0 && (

                                        <ul className="learning-objectives">

                                            {overview.learningObjectives.map((objective, index) => (

                                                <li key={`${objective}-${index}`}>

                                                    {objective}

                                                </li>

                                            ))}

                                        </ul>

                                    )}

                                </div>

                                <button
                                    type="button"
                                    className="overview-toggle"
                                    onClick={() => setIsOverviewExpanded((expanded) => !expanded)}
                                    aria-expanded={isOverviewExpanded}
                                >

                                    {isOverviewExpanded ? "Read Less" : "Read More"}

                                </button>

                            </div>

                            <div className="overview-illustration">

                                <BookOpen
                                    size={92}
                                    strokeWidth={1.3}
                                />

                            </div>

                        </section>

                        {topics.map((topic, index) => {

                            const isExpanded = expandedTopicIndex === index;

                            return (

                                <section
                                    key={`${topic.title}-${index}`}
                                    className={`summary-topic ${isExpanded
                                        ? "expanded"
                                        : "collapsed"
                                        }`}
                                >

                                    <button
                                        type="button"
                                        className="topic-header"
                                        onClick={() => handleTopicToggle(index)}
                                        aria-expanded={isExpanded}
                                    >

                                        <div className="topic-title">

                                            {isExpanded ? (
                                                <ChevronDown size={18} />
                                            ) : (
                                                <ChevronRight size={18} />
                                            )}

                                            <h3>{topic.title}</h3>

                                        </div>

                                    </button>

                                    {isExpanded && (

                                        <>

                                            <div className="topic-body">

                                                <p>{topic.summary}</p>

                                                {topic.keyPoints?.length > 0 && (

                                                    <ul className="key-points">

                                                        {topic.keyPoints.map((point, pointIndex) => (

                                                            <li key={`${point}-${pointIndex}`}>

                                                                {point}

                                                            </li>

                                                        ))}

                                                    </ul>

                                                )}

                                            </div>

                                            <div className="topic-divider" />

                                            <button
                                                type="button"
                                                className="explore-topic"
                                                onClick={() => handleAskLumi(
                                                    `Explain "${topic.title}" in detail using my uploaded study material.`
                                                )}
                                            >

                                                <Sparkles size={18} />

                                                Explore This Topic

                                            </button>

                                        </>

                                    )}

                                </section>

                            );

                        })}

                    </div>

                </div>

                <aside className="notes">

                    <div className="note yellow">

                        <h3>

                            <BrainCircuit size={18} />

                            Memory Trick

                        </h3>

                        <div className="note-content">

                            {expandedTopic?.memoryTrick && (

                                <>

                                    <p>{expandedTopic.memoryTrick.title}</p>

                                    <p>{expandedTopic.memoryTrick.content}</p>

                                </>

                            )}

                        </div>

                    </div>

                    <div className="note blue">

                        <h3>

                            <Zap size={18} />

                            Quick Revision

                        </h3>

                        <div className="note-content">

                            <div className="revision-tags">

                                {expandedTopic?.revisionTags?.map((tag, index) => (

                                    <button
                                        key={`${tag}-${index}`}
                                        onClick={() => handleAskLumi(
                                            `Give me a quick revision of "${tag}" using my uploaded study material.`
                                        )}
                                    >

                                        {tag}

                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>

                    <div className="note purple">

                        <h3>

                            <MessageCircleMore size={18} />

                            Continue with Lumi

                        </h3>

                        <div className="note-content">

                            {expandedTopic?.continueWithLumi?.map((prompt, index) => (

                                <button
                                    key={`${prompt}-${index}`}
                                    onClick={() => handleAskLumi(prompt)}
                                >

                                    {prompt}

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
