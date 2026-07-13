import { BaseEdge, getSmoothStepPath } from "@xyflow/react";

function MindMapEdge(props) {

    const [path] = getSmoothStepPath({

        sourceX: props.sourceX,

        sourceY: props.sourceY,

        targetX: props.targetX,

        targetY: props.targetY,

        sourcePosition: props.sourcePosition,

        targetPosition: props.targetPosition,

        borderRadius: 28

    });

    return (

        <BaseEdge

            path={path}

            style={{

                stroke: "#8AAE91",

                strokeWidth: 4,

                strokeLinecap: "round",

                opacity: 0.85

            }}

        />

    );

}

export default MindMapEdge;