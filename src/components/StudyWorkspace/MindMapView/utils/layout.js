import ELK from "elkjs/lib/elk.bundled.js";

const elk = new ELK();

export async function layoutTree(nodes, edges) {

    const graph = {

        id: "root",

        layoutOptions: {

            "elk.algorithm": "layered",

            "elk.direction": "DOWN",

            "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",

            "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",

            "elk.spacing.nodeNode": "80",

            "elk.layered.spacing.nodeNodeBetweenLayers": "180",

            "elk.padding": "[top=80,left=80,bottom=80,right=80]"

        }, // <-- Missing comma was here

        children: nodes.map(node => ({

            id: node.id,

            width:

                node.data.level === 0

                    ? 300

                    : node.data.level === 1

                        ? 180

                        : 150,

            height:

                node.data.level === 0

                    ? 90

                    : 60

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

    // Center the root node

    const root = positionedNodes.find(

        node => node.data.level === 0

    );

    if (root) {

        const offsetX = 600 - root.position.x;

        positionedNodes.forEach(node => {

            node.position.x += offsetX;

        });

    }

    return {

        nodes: positionedNodes,

        edges

    };

}