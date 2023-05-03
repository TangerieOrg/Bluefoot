import { NodeDefinitionBuilder } from "@Noodle/core/NodeDefinition";

const Add = NodeDefinitionBuilder.create("Add")
    .tag("Pure")
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
    .tag("Event")
    .displayName("On Key Event")
    .output("Pressed", "Execution")
    .output("Released", "Execution")
    .output("Key", "String")
    .build()

const StringLength = NodeDefinitionBuilder.create("StringLength")
    .tag("Pure")
    .displayName("Length (String)")
    .input("String", "String")
    .output("Length", "Number")
    .build()

const LogString = NodeDefinitionBuilder.create("Log String")
    .tag("Development")
    .input("execute", "Execution")
    .input("String", "String")
    .output("then", "Execution")
    .build()

export const NoodleSTD = { Add, NumberToString, OnKeyEvent, StringLength, LogString } as const;