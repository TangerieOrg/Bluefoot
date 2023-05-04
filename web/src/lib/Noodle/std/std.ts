import { NodeDefinitionBuilder } from "@Noodle/core/NodeDefinition";


const add = NodeDefinitionBuilder.create("add")
    .displayName("Add")
    .tag("Pure")
    .input("a", "Number")
    .input("b", "Number")
    .output("sum", "Number")
    .build()

const numberToString = NodeDefinitionBuilder.create("numberToString")
    .displayName("ToString (Number)")
    .input("execute", "Execution")
    .input("number", "Number")
    .input("round", "Boolean", "Round?")
    .output("then", "Execution")
    .output("string", "String")
    .build()

const onKeyEvent = NodeDefinitionBuilder.create("onKeyEvent")
    .tag("Event")
    .output("pressed", "Execution")
    .output("released", "Execution")
    .output("key", "String")
    .build()

const stringLength = NodeDefinitionBuilder.create("stringLength")
    .displayName("Length (String)")
    .tag("Pure")
    .input("string", "String")
    .output("length", "Number")
    .build()

const logString = NodeDefinitionBuilder.create("logString")
    .tag("Development")
    .description("Prints the provided string to the debug log")
    .input("execute", "Execution")
    .input("string", "String")
    .output("then", "Execution")
    .build()

const ifElse = NodeDefinitionBuilder.create("ifElse")
    .input("execute", "Execution")
    .input("condition", "Boolean")
    .output("if", "Execution")
    .output("else", "Execution")
    .build()

const whileLoop = NodeDefinitionBuilder.create("while")
    .input("execute", "Execution")
    .input("condition", "Boolean")
    .output("body", "Execution")
    .output("end", "Execution")
    .build()

export const NoodleSTD = { add, numberToString, onKeyEvent, stringLength, logString, ifElse, whileLoop } as const;