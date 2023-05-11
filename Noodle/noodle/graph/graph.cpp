#include "graph.hpp"
#include "noodle/macros.hpp"

namespace Noodle {

Graph::Graph(std::string _name) {
    name = _name;
}

std::vector<std::string> Graph::getNodeIDs() {
    std::vector<std::string> names;

    for(auto kv : nodes) names.push_back(kv.first);

    return names;
}

GraphNode Graph::getNode(NodeID id) {
    return nodes[id];
}

void Graph::removeNode(NodeID id) {
    auto n = getNode(id);
    n.node.onRemove();
    nodes.erase(nodes.find(id));
}

bool Graph::hasNode(NodeID id) {
    return nodes.contains(id);
}

void Graph::addConnection(PinPath from, PinPath to) {
    connections[nextConnectionId] = NodeConnection {
        nextConnectionId, from, to
    };

    nextConnectionId++;
}

void Graph::removeConnection(int id) {
    connections.erase(connections.find(id));
}

std::vector<NodeConnection> Graph::getConnections() {
    std::vector<NodeConnection> conns;

    for(auto kv : connections) conns.push_back(kv.second);

    return conns;
}

void Graph::clear() {
    for(auto kv : connections) {
        removeConnection(kv.first);
    }
    connections.clear();

    for(auto kv : nodes) {
        kv.second.node.onRemove();
    }
    nodes.clear();
}

EMSCRIPTEN_BINDINGS(Noodle) {
    EM_OBJECT(GraphNode)
        .field("node", &GraphNode::node)
        .field("x", &GraphNode::x)
        .field("y", &GraphNode::y)
    ;

    EM_CLASS(Graph)
        .constructor<std::string>()
        .function("getNodeNames", &Graph::getNodeIDs)
        .function("getNode", &Graph::getNode)
        .function("removeNode", &Graph::removeNode)
        .function("hasNode", &Graph::hasNode)
        .function("addConnection", &Graph::addConnection)
        .function("removeConnection", &Graph::removeConnection)
        .function("getConnections", &Graph::getConnections)
        .function("clear", &Graph::clear)
        .EM_PROPERTY_GET(name, Graph)
    ;
}
}