import "./MindMapView.css";

import MindMapCanvas from "./Canvas/MindMapCanvas";
import LumiHint from "./LumiHint/LumiHint";

function MindMapView() {

    return (

        <div className="mindmap-view">

            <MindMapCanvas />

            <LumiHint />

        </div>

    );

}

export default MindMapView;