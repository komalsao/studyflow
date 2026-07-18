import "./MindMapCanvas.css";
import {
    ReactFlow,
    Background,
    ReactFlowProvider,
    useReactFlow
} from "@xyflow/react";

import MindMapEdge from "../Edge/MindMapEdge";
import "@xyflow/react/dist/style.css";
import MindMapToolbar from "../Toolbar/MindMapToolbar";
import MindMapNode from "../Node/MindMapNode";
import { convertTree } from "../utils/convertTree";
import { useEffect, useState } from "react";
import { layoutTree } from "../utils/layout";

function AutoFit({ nodes }) {

    const { fitView } = useReactFlow();

    useEffect(() => {

        if (!nodes.length) return;

        fitView({
            padding: 0.3,
            duration: 800,
        });

    }, [nodes, fitView]);

    return null;
}

function MindMapCanvas({

    rootNode,

    onNodeSelect,

    onCanvasClick

}) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const edgeTypes = {

        custom: MindMapEdge

    };

    const nodeTypes = {

        custom: MindMapNode

    };

    useEffect(() => {

        if (!rootNode) return;

        async function buildMap() {

            const tree = convertTree(rootNode);

            const layout = await layoutTree(
                tree.nodes,
                tree.edges
            );

            setNodes(

                layout.nodes.map(node => ({

                    ...node,

                    data: {

                        ...node.data,

                        onClick: onNodeSelect

                    }
                }))

            );

            setEdges(layout.edges);

        }

        buildMap();

    }, [rootNode, onNodeSelect]);


    return (

        <ReactFlowProvider>

            <div className="mindmap-canvas">

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    fitView
                    proOptions={{ hideAttribution: true }}
                    onPaneClick={onCanvasClick}
                >

                    <AutoFit nodes={nodes} />

                    <Background
                        gap={32}
                        size={1}
                        color="#F1EBE0"
                    />

                    <MindMapToolbar />

                </ReactFlow>

            </div>

        </ReactFlowProvider>

    );
}

export default MindMapCanvas;