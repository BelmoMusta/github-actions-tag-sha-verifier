import {getCurrentCommitForActionTagOrBranch} from "./get-current-action-commit-sha.js";
import {ActionRefReport, LockedActionInformation} from "./lockedActionInformation.js";

export async function check(lockedActions: LockedActionInformation[]) {
    const report = [] as ActionRefReport[]
    for (const action of lockedActions) {
        if (action.refs) {
            for (let ref of action.refs) {
                const refReport = {} as ActionRefReport
                refReport.name = action.name
                refReport.ref = ref.name
                refReport.expectedSHA = ref.commit
                const currentCommit = await getCurrentCommitForActionTagOrBranch(action.name, ref.name)
                refReport.actualSHA = currentCommit
                refReport.match = refReport.actualSHA === refReport.expectedSHA
                report.push(refReport)
            }
        }
    }
    return report
}