import { ReferenceConfig } from './types.js'
import {Octokit} from "octokit";

const baseUrl = 'https://api.github.com'

export async function getCurrentCommitForActionReference(
  referenceConfig: ReferenceConfig
): Promise<string> {
  let owner = ''
  let repo = ''
  if (referenceConfig.action.includes('/')) {
    owner = referenceConfig.action.split('/')[0]
    repo = referenceConfig.action.split('/')[1]
  }

  const octokit = new Octokit({
    userAgent: 'github-actions',
    auth: referenceConfig.githubToken
  })

  let ref = ''
  if (referenceConfig.type === 'tag') {
    ref = 'tags/'
  } else {
    ref = 'heads/'
  }
  const octokitResponse = await octokit.rest.git.getRef({
    ref: ref + referenceConfig.reference,
    repo,
    baseUrl,
    owner
  })
  return octokitResponse.data.object.sha
}
