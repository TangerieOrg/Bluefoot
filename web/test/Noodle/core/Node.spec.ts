import { expect } from "chai";
import { Node } from "@Noodle/core/Node";
import { NoodleSTD } from "@Noodle/std";

describe("Node Creation", () => {
    it("Should create from definition", () => {
        const node = new Node(NoodleSTD.Add);
        expect(node.definition).to.equal(NoodleSTD.Add);
        
    });

    it("Should be frozen", () => {
        const node = new Node(NoodleSTD.Add);
        expect(node.definition).to.be.frozen;
    });
    
    it("Should return correct pin data", () => {
        const node = new Node(NoodleSTD.Add);
        node.getPinType("")
    })
})