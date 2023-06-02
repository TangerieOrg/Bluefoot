#pragma once
#include <string>
#include <vector>
#include <map>
#include <utility>
#include "noodle/macros.hpp"
#include "noodle/node/StandardNode.hpp"
#include "noodle/node/definition.hpp"

namespace Noodle {

struct GraphNode {
    int x;
    int y;
    // Change to INode
    StandardNode node;
};

typedef std::string NodeID;

class Graph {
public:
    Graph(std::string name);

    GETTER(std::string, name)

    std::vector<std::string> getNodeIDs();
    GraphNode getNode(NodeID id);
    void removeNode(NodeID id);
    bool hasNode(NodeID id);
    std::string createNodeFromDefinition(NodeDefinition def, int x, int y);

    void addConnection(PinPath from, PinPath to);
    void removeConnection(int connectionId);
    std::vector<NodeConnection> getConnections();

    void clear();

private:
    std::string name;
    std::map<NodeID, GraphNode> nodes;
    std::map<int, NodeConnection> connections;
    int nextConnectionId = 0;
    int nextNodeId = 0;
};

}