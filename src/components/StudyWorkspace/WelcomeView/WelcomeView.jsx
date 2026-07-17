import "./WelcomeView.css";
import HeroCard from "./HeroCard";
import ActionGrid from "./ActionGrid";
import MaterialsPreview from "./MaterialsPreview";

function WelcomeView({
    setActiveView,
    materials,
    onMaterialRename,
    onMaterialDelete
}) {

    return (

        <div className="welcome-view">

            <div className="welcome-layout">

                <div className="welcome-left">

                    <HeroCard />

                    <ActionGrid setActiveView={setActiveView} />

                </div>

                <div className="welcome-right">

                    <MaterialsPreview
                        materials={materials}
                        onMaterialRename={onMaterialRename}
                        onMaterialDelete={onMaterialDelete}
                    />

                </div>

            </div>


        </div>

    );

}

export default WelcomeView;
