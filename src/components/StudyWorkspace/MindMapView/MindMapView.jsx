import "./MindMapView.css";
import { useEffect, useRef, useState } from "react";

import MindMapCanvas from "./Canvas/MindMapCanvas";
import LumiExplanation from "./LumiExplanation/LumiExplanation";
import { updateProgress } from "../../../services/progressService";
import MindMapSkeleton from "../../Shared/Skeleton/Workspace/MindMapSkeleton";

function MindMapView({ session, onProgressUpdate }) {
    const [selectedNode, setSelectedNode] = useState(null);
    const markedSessionId = useRef(null);
    const mindMap = session?.resources?.mindMap;

    useEffect(() => {
        if (!session?.id || session.progress?.mindmap || markedSessionId.current === session.id) return;

        markedSessionId.current = session.id;
        updateProgress(session.id, "mindmap")
            .then(() => onProgressUpdate?.("mindmap"))
            .catch((error) => {
                markedSessionId.current = null;
                console.error("Unable to update mind map progress:", error);
            });
    }, [session?.id, session?.progress?.mindmap]);

    if (!mindMap) {

        return <MindMapSkeleton />;

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
