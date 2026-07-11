import "./MindMapToolbar.css";
import { useReactFlow } from "@xyflow/react";
import {

    Plus,

    Minus,

    LocateFixed,

    Maximize

} from "lucide-react";

function MindMapToolbar() {
    const { zoomIn, zoomOut, fitView, setCenter } = useReactFlow();
    return (

        <div className="mindmap-toolbar">

            <button
                onClick={() => zoomIn()}
            >

                <Plus size={18} />

            </button>

            <button
                onClick={() => zoomOut()}
            >

                <Minus size={18} />

            </button>

            <button
                onClick={() =>
                    fitView({

                        duration: 600,

                        maxZoom: 1.2

                    })
                }
            >

                <LocateFixed size={18} />

            </button>

            <button
                onClick={() =>
                    fitView({

                        duration: 700,

                        padding: 0.25

                    })
                }
            >

                <Maximize size={18} />

            </button>

        </div>

    );

}

export default MindMapToolbar;