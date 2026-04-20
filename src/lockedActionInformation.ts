export type LockedActionInformation = {
    name: string
    versioningType: string
    refs:
        | {
        name: string
        commit: string
        aliases: string[] | undefined
    }[]
        | undefined
}

export type ActionRefReport = {
    name: string
    ref: string
    expectedSHA: string
    actualSHA: string
    match: boolean
}
