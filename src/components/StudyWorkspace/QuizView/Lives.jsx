import { Heart } from "lucide-react";

function Lives({

    lives,

    lostHeart

}) {

    return (

        <div className="quiz-lives">

            {[1, 2, 3].map((heart) => (

                <div

                    key={heart}

                    className={`

                        life

                        ${heart === lostHeart ? "lost" : ""}

                    `}

                >

                    <Heart

                        size={22}

                        fill={heart <= lives ? "#EF6A4D" : "transparent"}

                        color={heart <= lives ? "#EF6A4D" : "#D8D8D8"}

                    />

                </div>

            ))}

        </div>

    );

}

export default Lives;