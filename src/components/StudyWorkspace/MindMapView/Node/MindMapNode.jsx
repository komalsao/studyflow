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

                onClick={() =>

                    data.onClick({

                        title: data.title,

                        explanation: data.explanation

                    })

                }

            >

                <div className="node-title">

                    {data.title}

                </div>

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