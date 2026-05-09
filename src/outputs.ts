import * as core from '@actions/core'
import { Summary } from './types.js'

export function setOutputs(result: Summary) {
  core.setOutput('json-report', result.json)
  core.setOutput('markdown-report', result.markdown)
}
