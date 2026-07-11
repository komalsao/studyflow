import "./MindMapCanvas.css";
import {
    ReactFlow,
    Background,
    ReactFlowProvider
} from "@xyflow/react";

import MindMapEdge from "../Edge/MindMapEdge";
import "@xyflow/react/dist/style.css";
import MindMapToolbar from "../Toolbar/MindMapToolbar";
import MindMapNode from "../Node/MindMapNode";
import sampleMindMap from "../data/sampleMindMap";
import { convertTree } from "../utils/convertTree";
import { useEffect, useState } from "react";
import { layoutTree } from "../utils/layout";

function MindMapCanvas() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const edgeTypes = {

        custom: MindMapEdge

    };

    const nodeTypes = {

        custom: MindMapNode

    };

    useEffect(() => {

        async function buildMap() {

            const tree = convertTree(sampleMindMap);

            const layout = await layoutTree(

                tree.nodes,

                tree.edges

            );

            setNodes(layout.nodes);

            setEdges(layout.edges);

        }

        buildMap();

    }, []);


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

                >

                    <Background />

                    <MindMapToolbar />

                </ReactFlow>

            </div>

        </ReactFlowProvider>

    );
}

export default MindMapCanvas;