let idCounter = 1;

export function convertTree(tree) {

    idCounter = 1;

    const nodes = [];

    const edges = [];

    function traverse(node, parentId = null, level = 0) {

        const id = String(idCounter++);

        nodes.push({

            id,

            type: "custom",

            position: {

                x: 0,
                y: 0

            },

            data: {

                label: node.title,

                level

            }

        });

        if (parentId) {

            edges.push({

                id: `${parentId}-${id}`,

                source: parentId,

                target: id,

                type: "custom"

            });

        }

        if (node.children) {

            node.children.forEach(child =>

                traverse(child, id, level + 1)

            );

        }

    }

    traverse(tree);

    return {

        nodes,

        edges

    };

}