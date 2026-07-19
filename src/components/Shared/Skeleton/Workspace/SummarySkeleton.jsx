import "./SummarySkeleton.css";

function SummarySkeleton() {
    return (
        <div className="summary-skeleton">

            <div className="summary-left">

                <div className="summary-card">

                    <div className="skeleton summary-title"></div>

                    <div className="skeleton summary-line"></div>
                    <div className="skeleton summary-line"></div>
                    <div className="skeleton summary-line"></div>
                    <div className="skeleton summary-line short"></div>

                    <div className="skeleton summary-button"></div>

                </div>

                <div className="summary-card">

                    <div className="skeleton topic-title"></div>

                    <div className="skeleton topic-line"></div>
                    <div className="skeleton topic-line"></div>
                    <div className="skeleton topic-line"></div>

                    <div className="summary-bullets">

                        <div className="skeleton bullet"></div>
                        <div className="skeleton bullet"></div>
                        <div className="skeleton bullet short"></div>

                    </div>

                </div>

            </div>

            <div className="summary-right">

                <div className="sticky-card yellow">

                    <div className="skeleton sidebar-title"></div>

                    <div className="skeleton sidebar-line"></div>
                    <div className="skeleton sidebar-line"></div>
                    <div className="skeleton sidebar-line short"></div>

                </div>

                <div className="sticky-card blue">

                    <div className="skeleton sidebar-title"></div>

                    <div className="skeleton chip"></div>
                    <div className="skeleton chip"></div>
                    <div className="skeleton chip"></div>
                    <div className="skeleton chip"></div>

                </div>

                <div className="sticky-card purple">

                    <div className="skeleton sidebar-title"></div>

                    <div className="skeleton question"></div>
                    <div className="skeleton question"></div>
                    <div className="skeleton question short"></div>

                </div>

            </div>

        </div>
    );
}

export default SummarySkeleton;