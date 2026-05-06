export type LockedActionInformation = {
  name: string
  versioningType: string
  refs: {
    type: 'branch' | 'tag'
    name: string
    commit: string
    aliases: string[] | undefined
  }[]
}

export type ActionRefReport = {
  name: string
  ref: string
  expectedSHA: string
  actualSHA: string
  match: boolean
}

export type Summary = {
  json: string
  markdown: string
}

export type CheckConfig = {
  githubToken: string
}

export type ReferenceConfig = {
  type: 'branch' | 'tag'
  action: string
  reference: string
  githubToken: string | undefined
}

export type SummaryOptions = {
  writeToJobSummary: boolean
}

export type Inputs = {
  lockFileLocation: string
  writeToJobSummary: boolean
  githubToken: string
}
