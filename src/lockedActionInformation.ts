export type LockedActionInformation = {
  name: string
  versioningType: string
  tags:
    | {
        name: string
        commit: string
        aliases: string[] | undefined
      }[]
    | undefined
}
