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
import sampleMindMap from "../data/sampleMindMap";
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

        async function buildMap() {

            const tree = convertTree(sampleMindMap);

            const descriptions = {

                "Memory Management":
                    "Memory Management controls how memory is allocated and used by programs.",

                "Paging":
                    "Paging divides memory into fixed-size pages for efficient allocation.",

                "Segmentation":
                    "Segmentation divides memory into logical sections such as code and data.",

                "Virtual Memory":
                    "Virtual Memory allows programs to use more memory than physically available.",

                "Frames":
                    "Frames are fixed-size blocks of physical memory.",

                "TLB":
                    "The Translation Lookaside Buffer caches recent page table entries.",

                "Page Table":
                    "A Page Table maps virtual pages to physical frames.",

                "Demand Paging":
                    "Demand Paging loads pages only when they are actually needed."

            };

            const layout = await layoutTree(

                tree.nodes,

                tree.edges

            );

            setNodes(

                layout.nodes.map(node => ({

                    ...node,

                    data: {

                        ...node.data,

                        title: node.data.label,

                        description:

                            descriptions[node.data.label] ||

                            "Explanation coming soon.",

                        onClick: onNodeSelect

                    }

                }))

            );

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