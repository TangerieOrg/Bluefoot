import { expect } from "chai";
import { Node } from "@Noodle/core/Node";
import { NoodleSTD } from "@Noodle/std";

describe("Node Creation", () => {
    it("Should create from definition", () => {
        const node = Node.fromDefinition(NoodleSTD.add);
        expect(node.definition).to.equal(NoodleSTD.add);
        
    });

    it("Should be frozen", () => {
        const node = Node.fromDefinition(NoodleSTD.add);
        expect(node.definition).to.be.frozen;
        expect(node.definition.tags).to.be.frozen;
        expect(node.definition.pins).to.be.frozen;
        expect(node.definition.pins[0]).to.be.frozen;
    });
    
    it("Should return correct pin data", () => {
        const node = Node.fromDefinition(NoodleSTD.add);
        expect(node.isPure()).to.be.true;

        expect(node.definition.pins).to.have.length(3);
        expect(node.definition.tags).to.have.length(1);

        const p = node.getPin("a");
        expect(p).not.to.be.null;
        expect(p.type).to.equal("Number");

        expect(node.getConnections("a")).to.be.undefined;
    })
})