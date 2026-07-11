import "./MindMapNode.css";

import {
    Handle,
    Position
} from "@xyflow/react";

function MindMapNode({ data }) {

    return (

        <>

            <Handle
                type="target"
                position={Position.Top}
                style={{ opacity: 0 }}
            />

            <div
                className={`mindmap-node level-${data.level}`}
            >

                {data.label}

            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                style={{ opacity: 0 }}
            />

        </>

    );

}

export default MindMapNode;