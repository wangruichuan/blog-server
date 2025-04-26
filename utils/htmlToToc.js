const { JSDOM } = require('jsdom');

function htmlToToc(html) {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    let startLevel = 0;
    for (let i = 0; i < headings.length; i++) {
        if (doc.querySelector(headings[i])) {
            startLevel = i;
            break;
        }
    }
    const stack = [];
    const result = [];

    function addToTree(heading) {
        const level = headings.indexOf(heading.tagName.toLowerCase());
        const item = {
            name: heading.innerHTML,
            anchor: heading.id || ''
        };
        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
            stack.pop();
        }
        if (stack.length === 0) {
            result.push(item);
        } else {
            const parent = stack[stack.length - 1].node;
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(item);
        }
        stack.push({ level, node: item });
    }

    for (let i = startLevel; i < headings.length; i++) {
        const elements = doc.querySelectorAll(headings[i]);
        elements.forEach(addToTree);
    }

    return result;
}

module.exports = htmlToToc;