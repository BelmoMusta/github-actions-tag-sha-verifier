import {Octokit} from 'octokit'

export async function getCurrentCommitForActionTagOrBranch(
  action: string,
  tagOrBranch: string
): Promise<string> {
  let owner = ''
  let repo = ''
  if (action.includes('/')) {
    owner = action.split('/')[0]
    repo = action.split('/')[1]
  }
  const octokit = new Octokit({ userAgent: 'github-actions' })
  let octokitResponse = await octokit.rest.git.getRef({
    ref: 'tags/' + tagOrBranch,
    repo: repo,
    baseUrl: 'https://api.github.com',
    owner: owner
  })
  return octokitResponse.data.object.sha
}
