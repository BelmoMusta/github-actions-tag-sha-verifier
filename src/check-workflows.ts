import fs from 'fs-extra'
import * as path from 'path'
import * as YAML from 'yaml'
import { ExistingUsedAction } from './types.js'

export function checkWorkflows(directory: string) {
  const existingUsedActions: ExistingUsedAction[] = []
  const workflowsDirectory = path.resolve(directory, '.github/workflows')
  if (fs.existsSync(workflowsDirectory)) {
    const readFileSync = fs.readdirSync(workflowsDirectory)
    for (const file of readFileSync) {
      const yamlFilePath = path.resolve(workflowsDirectory, file)
      const fileContent = fs.readFileSync(yamlFilePath, 'utf8')
      const parsedYaml = YAML.parse(fileContent)
      const jobs = parsedYaml['jobs']
      if (jobs) {
        for (const key in jobs) {
          const job = jobs[key]
          if (job.steps) {
            for (const step of job.steps) {
              if (step.uses) {
                if (step.uses.includes('@')) {
                  const split = step.uses.toString().split('@')
                  const actionName = split[0]
                  const tag = split[1] as string
                  existingUsedActions.push({
                    file: yamlFilePath,
                    ref: tag,
                    name: actionName
                  })
                }
              }
            }
          }
        }
      }
    }
  }

  return existingUsedActions
}

const directory = '/Users/mac/IdeaProjects/github-actions-tag-sha-verifier' // TODO
const existingUsedActions = checkWorkflows(directory)
console.log(existingUsedActions)
