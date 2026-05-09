import { getCurrentCommitForActionReference } from './get-current-action-commit-sha.js'
import {
  ActionRefReport,
  CheckConfig,
  LockedActionInformation
} from './types.js'

export async function check(
  lockedActions: LockedActionInformation[],
  checkConfig: CheckConfig
) {
  const report = [] as ActionRefReport[]
  for (const action of lockedActions) {
    for (const ref of action.refs) {
      const refReport = {} as ActionRefReport
      refReport.name = action.name
      refReport.ref = ref.name
      refReport.expectedSHA = ref.commit
      refReport.actualSHA = await getCurrentCommitForActionReference({
        type: ref.type,
        action: action.name,
        reference: ref.name,
        githubToken: checkConfig.githubToken
      })
      refReport.match = refReport.actualSHA === refReport.expectedSHA
      report.push(refReport)
    }
  }
  return report
}
