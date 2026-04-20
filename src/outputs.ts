import * as core from "@actions/core";

export function setOutputs(result: any) {
    core.setOutput('json-report', result.json)
    core.setOutput('markdown-report', result.markdown)
}