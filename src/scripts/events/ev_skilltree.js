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
    }, {offY: -8}, { css: ["framedSmaller2"] });
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
            getStriderStats(strider, true);
        })
        document.querySelector('#' + trimWhitespacesInsideString(node.name)).addEventListener('contextmenu', e => {
            e.preventDefault();
            e.stopImmediatePropagation();
        })
    })
}

function generateSkillTreeEvents(devMode = false) {
    let zoomLevel = 1;
    const map = document.querySelector('.striderSkillTree-obj');
    const mapContainer = document.querySelector('.striderSkillTree');
    const nodes = document.querySelectorAll('.treeNode');
    let translateX = 0;
    let translateY = 0;

    mapContainer.addEventListener('wheel', e => {
        map.style.transition = '';
        mapContainer.style.transition = '';
        e.preventDefault();

        const direction = Math.sign(e.deltaY); // 1 out, -1 in

        zoomLevel += -direction * 0.05;
        zoomLevel = Math.max(0.65, zoomLevel);
        zoomLevel = Math.min(1, zoomLevel);

        map.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
    });

    mapContainer.addEventListener('mousedown', e => {
        map.style.transition = '';
        mapContainer.style.transition = '';
        let moving = true;

        let initX = e.clientX;
        let initY = e.clientY;

        const onMove = (e) => {
            if (!moving) return;

            const deltaX = e.clientX - initX;
            const deltaY = e.clientY - initY;
            initX = e.clientX;
            initY = e.clientY;

            translateX += deltaX;
            translateY += deltaY;

            map.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
        };

        const stopMoving = () => {
            moving = false;
        };

        mapContainer.addEventListener('mousemove', onMove);
        mapContainer.addEventListener('mouseup', stopMoving);
        mapContainer.addEventListener('mouseleave', stopMoving);
    });

    if(devMode) {
        nodes.forEach(node => {
            node.style.transition = 'none';
            let offsetX, offsetY, initialX, initialY, isDragging = false;
    
            node.addEventListener('mousedown', function(e) {
                if(!e.shiftKey) return;
                e.stopImmediatePropagation();
    
                isDragging = true;
                initialX = e.clientX;
                initialY = e.clientY;
    
                const transformMatrix = window.getComputedStyle(node).transform;
                if (transformMatrix !== 'none') {
                    const matrixValues = transformMatrix.match(/matrix.*\((.+)\)/)[1].split(', ');
                    offsetX = parseFloat(matrixValues[4]);
                    offsetY = parseFloat(matrixValues[5]);
                } else {
                    offsetX = 0;
                    offsetY = 0;
                }
    
                node.style.cursor = 'grabbing';
            });
    
            mapContainer.addEventListener('mousemove', function(e) {
                if (isDragging) {
                    const deltaX = e.clientX - initialX;
                    const deltaY = e.clientY - initialY;
    
                    const newX = offsetX + deltaX;
                    const newY = offsetY + deltaY;
    
                    node.style.transform = `translate(${newX*1.2}px, ${newY*1.2}px)`;
                }
            });
    
            mapContainer.addEventListener('mouseup', function() {
                isDragging = false;
                node.style.cursor = 'grab';
            });
        });
    }
}