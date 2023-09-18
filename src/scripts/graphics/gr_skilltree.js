/**
 * Returns a string of HTML Code that contains data from the provided Strider's Skill Tree.
 * @param {Strider} strider the Strider whose Skill Tree will be drawn
 * @returns {string} an HTML code that contains the skill tree
 */
function drawSkillTree(strider) {
    let str = '';

    //draw power node
    str += '<div class="treeFraction">';
    str += '<div id="' + trimWhitespacesInsideString(strider.name) + '-0" class="treeNode coolBorder powerNode" style="background-image: url(\'css/img/skills/' + strider.name + strider.uniqueIcon + '.png\')"></div>';
    str += '</div>';

    // find tree roots
    let roots = [];
    strider.skillTree.nodes.forEach(node => {
        if(node.previous.length == 0) roots.push(node);
    })

    // prepare tree model
    let tree = {};
    // build the tree (append) from each root
    roots.forEach(root => {
        tree = buildSkillTree(root, 0, tree);
    });
    //console.log(tree);

    // for each depth on the tree model, create a new treeFraction and fill it with the nodes at that depth
    for(const depth in tree) {
        //console.log('Depth: ' + depth);
        str += '<div class="treeFraction">';
        for(const node of tree[depth]) {
            str += '<div id="' + trimWhitespacesInsideString(node.name) + '" class="treeNode ' + getBorderClassFromNode(node) + ' powerNode" style="background-image: url(\'css/img/skills/' + strider.name + node.icon + '.png\')"></div>';
        }
        str += '</div>';
    }
    return str;
}

/**
 * Draws lines between each node of the provided Strider's Skill Tree.
 * This is achieved by spawning an SVG panel of the same size as the Skill Tree container, then computing each line's start and end coordinates and drawing them.
 * Since the SVG panel is drawn in front of the base Skill Tree container, it is necessary to call the function bringNodesForward() in
 * order to re-enable the hover features of each node.
 * @param {Strider} strider the Strider whose Skill Tree's layout will be used to draw lines
 */
function drawSkillTreeLines(strider) {
    const parent = document.querySelector('.striderSkillTree')

    let str = '';

    str += '<svg class="skillTreeLinesOverlay" height="' + parent.scrollHeight + '" width="' + parent.offsetWidth + '">';
    strider.skillTree.nodes.forEach(node => {

        const elem = document.querySelector('#' + trimWhitespacesInsideString(node.name));
        const basePos = elem.getBoundingClientRect();
        const basePosOriginX = elem.offsetLeft + basePos.width/2;
        const basePosOriginY = elem.offsetTop + basePos.height;
        let children = [];
        node.next.forEach(next => {
            children.push(
                {
                    dom: document.querySelector('#' + trimWhitespacesInsideString(next.name)),
                    obj: next
                }
            );
        });
        children.forEach(child => {
            let color = getLineColorFromNodeState(child.obj, node);
            let type = child.obj.isUnlocked() && node.currentLevel > 0 ? false : true;
            let targetPos = child.dom.getBoundingClientRect();
            let targetPosOriginX = child.dom.offsetLeft + targetPos.width/2;
            let targetPosOriginY = child.dom.offsetTop;
            let id = 'line-' + trimWhitespacesInsideString(child.obj.name) +'-childOf-' + trimWhitespacesInsideString(node.name);
            str += '<line class="skillTreeLine" id="' + id + '" x1="' + basePosOriginX + '" y1="' + basePosOriginY +'" x2="' + targetPosOriginX + '" y2="' + targetPosOriginY + '" style="stroke:' + color + '; stroke-width: ' + (type ? '1' : '2') + ';' + (type ? ' stroke-dasharray: 10; animation-name: animstroke; animation-iteration-count: infinite; animation-duration: 60s; animation-timing-function: linear;' : '') + '" />';
        })
    });

    str += '</svg>';

    parent.innerHTML += str;
}

/**
 * Unlocks the provided Node and updates DOM elements accordingly.
 * @param {Strider} strider the Strider that will unlock the node
 * @param {SkillTreeNode} node the Node to be unlocked
 */
function unlockNode(strider, node) {
    if(strider.canUnlockTreeNode(node)) {
        strider.unlockTreeNode(node);
        // UPDATE TOOLTIP
        document.querySelector('#tooltip').innerHTML = getNodeTooltip(strider, node);
        // UPDATE NODE SQUARE
        document.querySelector('#' + trimWhitespacesInsideString(node.name)).classList.remove('coolBorder');
        if(node.currentLevel == node.levels){
            document.querySelector('#' + trimWhitespacesInsideString(node.name)).classList.add('skillTreeNode-animate-full', 'borderNodeFull');
        } else {
            document.querySelector('#' + trimWhitespacesInsideString(node.name)).classList.add('skillTreeNode-animate-progress', 'borderNodeOngoing');
        }
        // UPDATE NODE LINES (NEXT & PREVIOUS);
        node.next.forEach(next => {
            const id = '#line-' + trimWhitespacesInsideString(next.name) +'-childOf-' + trimWhitespacesInsideString(node.name);
            document.querySelector(id).classList.add('skillTreeLine-animate-unlock');
        });
        node.previous.forEach(previous => {
            const id = '#line-' + trimWhitespacesInsideString(node.name) +'-childOf-' + trimWhitespacesInsideString(previous.name);
            if(node.currentLevel > 0 && node.currentLevel < node.levels && previous.currentLevel > 0) {
                document.querySelector(id).classList.add('skillTreeLine-animate-progress');
            } else if(node.currentLevel == node.levels && previous.currentLevel > 0) {
                document.querySelector(id).classList.add('skillTreeLine-animate-full');
            }
        });
        document.querySelector('.stridersSkillTreePointsIndicator').textContent = strider.skillPoints + ' unspent points';
    }
}

/**
 * Brings all of the tree fractions forward by increasing their z-index value.
 * This is necessary because the SVG panel, which contains the lines that connect each skill tree node, is drawn above the base node layout,
 * which means it blocks their hover features. By bringing the nodes back forward, the SVG lines remain visible and we allow the user
 * to access the hover features of the nodes.
 */
function bringNodesForward() {
    document.querySelectorAll('.treeFraction').forEach(single => {
        single.style.position = "relative";
        single.style.zIndex = "1";
    });
}

/**
 * Returns HTML code that contains data for the provided Strider's inner power.
 * @param {Strider} strider the Strider to retrieve data from
 * @returns {string} a string that contains HTML code
 */
function getPowerNodeTooltip(strider) {
    let str = '';
    str += '<div class="nodeContainer">';

    str += '<div class="nodeContainerBanner">';
    str += '<div class="vignette coolBorder" style="background-image: url(\'css/img/skills/' + strider.name + strider.uniqueIcon + '.png\')"></div>';
    str += '<div class="desc">';
    str += '<h4>' + strider.uniqueName + '</h4>';
    str += '<div class="treeNodeTags">'
    str += '<div class="treeNodeType treeNodeType-power">Inner Power</div>';
    str += '</div>'
    str += '</div>';
    str += '</div>';

    str += '<div class="divider"></div>';

    str += '<div class="nodeDesc">' + strider.uniqueDesc +'</div>';
    str += '<div class="divider"></div>';
    str += '<div class="par tooltipDesc">' + strider.uniqueQuote + '</div>'

    str += '</div>';
    str += '</div>';

    return str;
}

/**
 * Returns HTML code that contains data for a Skill Tree Node tooltip, based on the provided Strider and Node objects.
 * @param {Strider} strider the Strider to retrieve data from
 * @param {SkillTreeNode} node the SkillTreeNode to retrieve data from
 * @returns {string} a string that contains HTML code
 */
function getNodeTooltip(strider, node) {
    let str = '';
    str += '<div class="nodeContainer">';

    str += '<div class="nodeContainerBanner">';
    str += '<div class="vignette coolBorder" style="background-image: url(\'css/img/skills/' + strider.name + node.icon +'.png\')"></div>';
    str += '<div class="desc">';
    str += '<h4>' + node.name + '</h4>';
    str += '<div class="treeNodeTags">'
    str += '<div class="treeNodeType treeNodeType-' + node.type.toLowerCase() +'">' + capitalizeFirstLetter(node.type) +'</div>';
    str += '<div class="treeNodeType treeNodeType-' + (node.currentLevel == 0 ? 'off' : node.currentLevel < node.levels ? 'ongoing' : 'full') +'">' + node.currentLevel + '/' + node.levels + '</div>';
    str += '</div>'
    str += '</div>';
    str += '</div>';

    str += '<div class="divider"></div>';

    str += '<div class="nodeDesc">' + node.desc + '</div>';

    str += '<div class="divider"></div>';

    for(const level in node.rewards) {
        if(node.currentLevel == level) {
            str += '<div class="rewardsWrapper">';
            str += '<div class="par reward-' + (node.currentLevel < node.levels ? 'ongoing' : 'full') +'">Current level' + (node.currentLevel == node.levels ? ' (max.)' : '') +':</div>';
            node.rewards[level].forEach(reward => {
                str += '<div class="par bulleted">' + reward.desc + '</div>';
            });
            str += '</div>'
        } else if(node.currentLevel == level-1) {
            str += '<div class="rewardsWrapper">';
            str += '<div class="par" style="color: rgb(175,175,175)">Next level:</div>';
            node.rewards[level].forEach(reward => {
                str += '<div class="par bulleted" style="color: rgb(175,175,175)">' + reward.desc + '</div>';
            });
            str += '</div>';
        }
    }

    str += '<div class="divider"></div>';
    str += '<div class="par tooltipDesc">' + node.quote + '</div>';

    if(!node.isUnlocked()) {
        str += '<div class="par"></div>';
        str += '<div class="par"></div>';

        str += '<div class="par nodeDenied">This upgrade is locked. Unlock previous upgrades to access it.</div>';
    } else if(node.currentLevel != node.levels) {
        str += '<div class="par"></div>';
        str += '<div class="par"></div>';

        str += '<div class="par nodeRequirements">Requires: <span class="' + (node.getNextRequiredLevel() <= strider.level.currentLevel ? 'nodeFull' : 'nodeDenied') + '">Level ' + node.getNextRequiredLevel() + '</span>, <span class="' + (node.getNextRequiredSkillPoints() <= strider.skillPoints ? 'nodeFull' : 'nodeDenied') + '">' + node.getNextRequiredSkillPoints() + ' points</span></div>';
    }

    str += '</div>';
    str += '</div>';

    return str;
}