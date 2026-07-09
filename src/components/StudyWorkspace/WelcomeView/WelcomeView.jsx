import "./WelcomeView.css";
import HeroCard from "./HeroCard";
import ActionGrid from "./ActionGrid";
import MaterialsPreview from "./MaterialsPreview";
import ChatInput from "../Shared/ChatInput/ChatInput";

function WelcomeView({ setActiveView }) {

    return (

        <div className="welcome-view">

            <div className="welcome-layout">

                <div className="welcome-left">

                    <HeroCard />

                    <ActionGrid setActiveView={setActiveView} />

                </div>

                <div className="welcome-right">

                    <MaterialsPreview />

                </div>

            </div>


        </div>

    );

}

export default WelcomeView;