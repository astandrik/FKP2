var request = require("request");

var visibleNodes = [];

request("http://127.0.0.1/data/tree", function(error, response, body) {
  var tree = JSON.parse(body).data;

  var req = "Арктика";
  searchTree(tree,req);
  traverseTree(tree);
  console.log(visibleNodes);
});

function searchTree(tree,req){
for(var i = 0; i < tree.length; i++){
  searchNode(tree[i],req);
}
};

function searchNode(node, req) {
  if (node.name.toLowerCase().indexOf(req.toLowerCase()) > -1) {node.invisible = false;}
  else
  node.invisible = true;
  if(node.children.length > 0) {
    for(var i = 0; i < node.children.length; i++){
      searchNode(node.children[i], req)
    }
  }
};

function traverseTree(tree){
for(var i = 0; i < tree.length; i++){
  traverseNode(tree[i]);
}
};


function traverseNode(node) {
  if(!node.invisible) visibleNodes.push(node.name);
  if(node.children.length > 0) {
    node.children.forEach(function(n) {
      traverseNode(n);
    })
  }

}
