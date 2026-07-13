import "./MindMapView.css";
import { useState } from "react";

import MindMapCanvas from "./Canvas/MindMapCanvas";
import LumiExplanation from "./LumiExplanation/LumiExplanation";

function MindMapView() {
    const [selectedNode, setSelectedNode] = useState(null);

    return (

        <div className="mindmap-view">

            <MindMapCanvas

                onNodeSelect={setSelectedNode}
                onCanvasClick={() => setSelectedNode(null)}

            />

            <LumiExplanation

                selectedNode={selectedNode}

                onClose={() => setSelectedNode(null)}

            />


            

        </div>

    );

}

export default MindMapView;