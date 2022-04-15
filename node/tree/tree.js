const { list } = require('./list');
const util = require('util');
function listToTree(list) {
	let info = list.reduce(
		(map, node) => ((map[node.id] = node), (node.children = []), map),
		{}
	);
	return list.filter((node) => {
		info[node.parentId] && info[node.parentId].children.push(node);
		return !node.parentId;
	});
}
function treeFindPath(tree, func, path = []) {
	if (!tree) return [];
	for (const data of tree) {
		path.push(data.id);
		if (func(data)) return path;
		if (data.children) {
			const findChildren = treeFindPath(data.children, func, path);
			if (findChildren.length) return findChildren;
		}
		path.pop();
	}
	return [];
}
let tree = listToTree(list);
console.log(util.inspect(tree, { showHidden: false, depth: null }));
let result = treeFindPath(tree, (node) => node.id === '2-1-1');
console.log(result);
