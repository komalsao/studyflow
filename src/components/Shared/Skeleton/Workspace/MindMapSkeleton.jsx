import "./MindMapSkeleton.css";

function MindMapSkeleton() {

    return (

        <div className="mindmap-skeleton-wrapper">

            <div className="mindmap-root mm-shimmer"></div>

            <div className="mindmap-branches">

                <div className="mindmap-branch">

                    <div className="branch-line"></div>

                    <div className="mindmap-node mm-shimmer"></div>

                    <div className="mindmap-children">

                        <div className="mindmap-child mm-shimmer"></div>
                        <div className="mindmap-child mm-shimmer"></div>

                    </div>

                </div>

                <div className="mindmap-branch">

                    <div className="branch-line"></div>

                    <div className="mindmap-node mm-shimmer"></div>

                    <div className="mindmap-children">

                        <div className="mindmap-child mm-shimmer"></div>
                        <div className="mindmap-child mm-shimmer"></div>
                        <div className="mindmap-child mm-shimmer"></div>

                    </div>

                </div>

                <div className="mindmap-branch">

                    <div className="branch-line"></div>

                    <div className="mindmap-node mm-shimmer"></div>

                    <div className="mindmap-children">

                        <div className="mindmap-child mm-shimmer"></div>
                        <div className="mindmap-child mm-shimmer"></div>

                    </div>

                </div>

            </div>

            <div className="mindmap-loading">

                <div className="mm-shimmer loading-title"></div>

                <div className="mm-shimmer loading-subtitle"></div>

            </div>

        </div>

    );

}

export default MindMapSkeleton;