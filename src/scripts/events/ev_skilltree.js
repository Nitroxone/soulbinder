/**
 * Builds a SkillTree recursively. Returns an object that contains every node that descends from the provided start node, ranked by
 * depth (no duplicates allowed). Ideally, this function should be called on every root of a SkillTree in order to build a
 * fully exploitable tree model.
 * @param {SkillTreeNode} node the node to build
 * @param {number} depth the current depth of the tree
 * @param {object} result an object that contains each Node, ranked by depth
 */
function buildSkillTree(node, depth = 0, result = {}) {
    if(!node || arrayContains(result[depth], node)) return result;

    if(!result[depth]) {
        result[depth] = [];
    }
    result[depth].push(node);

    if(node.hasNext()) {
        node.next.forEach(next => {
            buildSkillTree(next, depth + 1, result);
        });
    }

    return result;
}

/**
 * Adds tooltips for each node of the provided Strider's Skill Tree.
 * @param {Strider} strider the Strider whose Skill Tree Nodes will be processed
 */
function addSkillTreeTooltips(strider) {
    // power node
    addTooltip(document.querySelector('#' + trimWhitespacesInsideString(strider.name) + '-0'), function(){
        return getPowerNodeTooltip(strider);
    }, {offY: -8});
    document.querySelector('#' + trimWhitespacesInsideString(strider.name) + '-0').addEventListener('contextmenu', e => {
        e.preventDefault();
        e.stopImmediatePropagation();
    })

    strider.skillTree.nodes.forEach(node => {
        addTooltip(document.querySelector('#' + trimWhitespacesInsideString(node.name)), function(){
            return getNodeTooltip(strider, node);
        }, {offY: -8});

        document.querySelector('#' + trimWhitespacesInsideString(node.name)).addEventListener('click', (e) => {
            unlockNode(strider, node);
        })
        document.querySelector('#' + trimWhitespacesInsideString(node.name)).addEventListener('contextmenu', e => {
            e.preventDefault();
            e.stopImmediatePropagation();
        })
    })
}