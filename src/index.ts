import {getLockedActions} from './actions-lock.js'
import {check} from "./actions-checker.js";
import {summary} from "./summary.js";
import {getInputs} from "./inputs.js";
import {setOutputs} from "./outputs.js";

const {lockFileLocation, writeToJobSummary} = getInputs();
const lockedActions = getLockedActions(lockFileLocation)
const actionRefReports = await check(lockedActions, {githubToken: ''});
const result = await summary(actionRefReports, {writeToJobSummary});
setOutputs(result)
