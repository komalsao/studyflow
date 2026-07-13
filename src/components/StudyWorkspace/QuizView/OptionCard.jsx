const optionLabels = ["A", "B", "C", "D"];

function OptionCard({

    index,
    option,
    selected,
    correct,
    wrong,
    disabled,
    onClick

}) {

    return (

        <button

            className={`option-card
                ${selected ? "selected" : ""}
                ${correct ? "correct" : ""}
                ${wrong ? "wrong" : ""}`}

            onClick={!disabled ? onClick : undefined}

            disabled={disabled}

        >

            <span className="option-letter">

                {optionLabels[index]}

            </span>

            <span className="option-text">

                {option}

            </span>

        </button>

    );

}

export default OptionCard;