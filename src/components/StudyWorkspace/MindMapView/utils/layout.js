import ELK from "elkjs/lib/elk.bundled.js";

const elk = new ELK();

export async function layoutTree(nodes, edges) {

    const graph = {

        id: "root",

        layoutOptions: {

            "elk.algorithm": "mrtree",

            "elk.direction": "DOWN",

            "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
            "elk.layered.considerModelOrder": "NODES_AND_EDGES",
            "elk.layered.mergeEdges": "true",
            "elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",

            "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",

            "elk.spacing.nodeNode": "140",

            "elk.layered.spacing.nodeNodeBetweenLayers": "220",

            "elk.padding": "[top=120,left=150,bottom=120,right=150]"

        },
        children: nodes.map(node => ({

            id: node.id,

            width:

                node.data.level === 0

                    ? 340

                    : node.data.level === 1

                        ? 220

                        : 170,

            height:

                node.data.level === 0

                    ? 100

                    : node.data.level === 1

                        ? 72

                        : 58,
        })),

        edges: edges.map(edge => ({

            id: edge.id,

            sources: [edge.source],

            targets: [edge.target]

        }))

    };

    const layout = await elk.layout(graph);

    const positionedNodes = nodes.map(node => {

        const elkNode = layout.children.find(

            child => child.id === node.id

        );

        return {

            ...node,

            position: {

                x: elkNode.x,

                y: elkNode.y

            }

        };

    });

    const minX = Math.min(...positionedNodes.map(n => n.position.x));
    const maxX = Math.max(...positionedNodes.map(n => n.position.x));

    const graphWidth = maxX - minX;
    const targetCenterX = 600; // half of ~1200px canvas

    const currentCenterX = minX + graphWidth / 2;
    const offsetX = targetCenterX - currentCenterX;

    positionedNodes.forEach(node => {
        node.position.x += offsetX;
    });



    return {

        nodes: positionedNodes,

        edges

    };

}