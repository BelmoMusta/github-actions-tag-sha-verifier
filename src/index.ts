import { Octokit } from 'octokit'
import './actions-lock.json'
import { LockedActionInformation } from './lockedActionInformation'

const lockedActionInformation =
  require('./actions-lock.json') as LockedActionInformation[]

async function getCurrentCommitForActionTagOrBranch(
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

for (const action of lockedActionInformation) {
  if (action.tags) {
    for (let tag of action.tags) {
      getCurrentCommitForActionTagOrBranch(action.name, tag.name)
        .then((currentCommit) => {
          if (tag.commit === currentCommit) {
            console.log(
              `'${action.name}' is good at tag '${tag.name}', having the commit '${currentCommit}'`
            )
          } else {
            console.log(
              `'${action.name}' is bad at tag '${tag.name}', expected commit: '${tag.commit}', actual commit: '${currentCommit}'`
            )
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
