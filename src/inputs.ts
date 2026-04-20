import * as core from "@actions/core";
import {Inputs} from "./types.js";

export function getInputs(): Inputs {
    const lockFileLocation = core.getInput('lock-file-location')
    const writeToJobSummary = core.getBooleanInput('write-to-job-summary')
    return {
        lockFileLocation,
        writeToJobSummary
    }
}