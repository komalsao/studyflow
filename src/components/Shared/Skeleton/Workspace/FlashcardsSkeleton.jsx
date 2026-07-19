import "./FlashcardsSkeleton.css";

function FlashcardsSkeleton() {

    return (

        <div className="fc-skeleton">

            <div className="fc-bg-card fc-bg-left"></div>
            <div className="fc-bg-card fc-bg-right"></div>
            <div className="fc-bg-card fc-bg-bottom-left"></div>
            <div className="fc-bg-card fc-bg-bottom-right"></div>

            <div className="fc-header">

                <div className="fc-shimmer fc-title"></div>

                <div className="fc-shimmer fc-subtitle"></div>

                <div className="fc-progress-wrapper">

                    <div className="fc-shimmer fc-progress-track"></div>

                    <div className="fc-shimmer fc-progress-label"></div>

                </div>

            </div>

            <div className="fc-card">

                <div className="fc-shimmer fc-card-label"></div>

                <div className="fc-shimmer fc-card-line"></div>
                <div className="fc-shimmer fc-card-line medium"></div>
                <div className="fc-shimmer fc-card-line short"></div>

            </div>

            <div className="fc-shimmer fc-hint"></div>

            <div className="fc-shimmer fc-button"></div>

        </div>

    );

}

export default FlashcardsSkeleton;