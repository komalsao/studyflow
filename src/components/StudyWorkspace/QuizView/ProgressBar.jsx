function ProgressBar({ current, total }) {

    const percentage = (current / total) * 100;

    return (

        <div className="quiz-progress-wrapper">

            <div
                className="quiz-progress-fill"
                style={{
                    width: `${percentage}%`
                }}
            />

        </div>

    );

}

export default ProgressBar;