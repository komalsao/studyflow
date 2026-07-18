import "./MindMapView.css";
import { useState } from "react";

import MindMapCanvas from "./Canvas/MindMapCanvas";
import LumiExplanation from "./LumiExplanation/LumiExplanation";

function MindMapView({ session }) {
    const [selectedNode, setSelectedNode] = useState(null);
    const mindMap = session?.resources?.mindMap;

    if (!mindMap) {

        return (

            <div className="mindmap-view">

                <div className="mindmap-loading">

                    <h2>

                        Building Mind Map...

                    </h2>

                    <p>

                        Lumi is organizing the concepts into a visual map.

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="mindmap-view">

            <MindMapCanvas
                rootNode={mindMap}
                onNodeSelect={setSelectedNode}
                onCanvasClick={() => setSelectedNode(null)}
            />

            <LumiExplanation

                session={session}

                selectedNode={selectedNode}

                onClose={() => setSelectedNode(null)}

            />




        </div>

    );

}

export default MindMapView;