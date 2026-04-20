import * as core from '@actions/core'
import {getLockedActions} from './actions-lock.js'
import {check} from "./actions-checker.js";
import {summary} from "./summary.js";

const lockFileLocation = core.getInput('lock-file-location');
const lockedActions = getLockedActions(lockFileLocation)
const actionRefReports = await check(lockedActions);
await summary(actionRefReports);
