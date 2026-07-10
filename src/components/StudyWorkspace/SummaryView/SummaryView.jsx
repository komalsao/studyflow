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

function SummaryView() {

    return (

        <div className="summary-view">

            <div className="summary-layout">

                {/* ===========================
                    LEFT CONTENT
                =========================== */}

                <div className="paper">

                    <div className="paper-content">

                        {/* Quick Overview */}

                        <section className="summary-overview">

                            <div className="overview-text">

                                <h2>

                                    <BookOpen size={22} />

                                    Quick Overview

                                </h2>

                                <p>

                                    This lesson introduces the fundamentals of
                                    Memory Management in operating systems. It
                                    explains how memory is allocated,
                                    organized and optimized for efficient
                                    execution of processes.

                                </p>

                                <p>

                                    You will explore techniques like paging,
                                    segmentation, virtual memory and
                                    thrashing along with their real-world
                                    applications.

                                </p>

                            </div>

                            <div className="overview-illustration">

                                <BookOpen
                                    size={92}
                                    strokeWidth={1.3}
                                />

                            </div>

                        </section>

                        {/* Expanded Topic */}

                        <section className="summary-topic expanded">

                            <div className="topic-header">

                                <div className="topic-title">

                                    <ChevronDown size={18} />

                                    <h3>

                                        Memory Management

                                    </h3>

                                </div>

                            </div>

                            <div className="topic-body">

                                <p>

                                    Memory management is a critical component
                                    of an operating system. It tracks memory
                                    usage, allocates and deallocates memory
                                    resources and ensures that multiple
                                    processes run efficiently without
                                    interfering with one another.

                                </p>

                                <div className="topic-illustration">


                                </div>

                            </div>

                            <div className="topic-divider" />

                            <button className="explore-topic">

                                <Sparkles size={18} />

                                Explore This Topic

                            </button>

                        </section>

                        {/* Collapsed Topics */}

                        <section className="summary-topic collapsed">

                            <ChevronRight size={18} />

                            <span>Paging</span>

                        </section>

                        <section className="summary-topic collapsed">

                            <ChevronRight size={18} />

                            <span>Segmentation</span>

                        </section>

                        <section className="summary-topic collapsed">

                            <ChevronRight size={18} />

                            <span>Thrashing</span>

                        </section>

                    </div>

                </div>

                {/* ===========================
                    STICKY NOTES
                =========================== */}

                <aside className="notes">

                    {/* Memory Trick */}

                    <div className="note yellow">

                        <h3>

                            <BrainCircuit size={18} />

                            Memory Trick

                        </h3>

                        <div className="note-content">

                            <p>

                                Remember PST

                            </p>

                            <ul>

                                <li>P → Paging</li>

                                <li>S → Segmentation</li>

                                <li>T → Thrashing</li>

                            </ul>

                        </div>

                    </div>

                    {/* Quick Revision */}

                    <div className="note blue">

                        <h3>

                            <Zap size={18} />

                            Quick Revision

                        </h3>

                        <div className="note-content">

                            <div className="revision-tags">

                                <span>Paging</span>

                                <span>TLB</span>

                                <span>Virtual Memory</span>

                                <span>Demand Paging</span>

                                <span>Thrashing</span>

                            </div>

                        </div>

                    </div>

                    {/* Continue with Lumi */}

                    <div className="note purple">

                        <h3>

                            <MessageCircleMore size={18} />

                            Continue with Lumi

                        </h3>

                        <div className="note-content">

                            <button>

                                Explain Memory Management

                            </button>

                            <button>

                                Difference between Paging & Segmentation

                            </button>

                            <button>

                                Practice Questions

                            </button>

                        </div>

                    </div>

                </aside>

            </div>

        </div>

    );

}

export default SummaryView;