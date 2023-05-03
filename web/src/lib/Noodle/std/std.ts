import { NodeDefinitionBuilder } from "@Noodle/core/NodeDefinition";

const Add = NodeDefinitionBuilder.create("Add")
    .input("a", "Number")
    .input("b", "Number")
    .output("sum", "Number")
    .build()

const NumberToString = NodeDefinitionBuilder.create("ToString (Number)")
    .input("execute", "Execution")
    .input("Number", "Number")
    .input("Round?", "Boolean")
    .output("then", "Execution")
    .output("String", "String")
    .build()

const OnKeyEvent = NodeDefinitionBuilder.create("OnKeyEvent")
    .displayName("On Key Event")
    .output("Pressed", "Execution")
    .output("Released", "Execution")
    .output("Key", "String")
    .build()

const StringLength = NodeDefinitionBuilder.create("StringLength")
    .displayName("Length (String)")
    .input("String", "String")
    .output("Length", "Number")
    .build()

const LogString = NodeDefinitionBuilder.create("Log String")
    .input("execute", "Execution")
    .input("String", "String")
    .output("then", "Execution")
    .tag("Development")
    .build()

export const NoodleSTD = { Add, NumberToString, OnKeyEvent, StringLength, LogString } as const;