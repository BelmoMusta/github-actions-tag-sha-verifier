import { Octokit } from 'octokit'
import type { OctokitOptions } from '@octokit/core'
import { throttling } from '@octokit/plugin-throttling'

export default function throttlingWith2Retries(options: OctokitOptions) {
  const octokit = new Octokit()
  const ThrottledOctokit = Octokit.plugin(throttling)
  return new ThrottledOctokit({
    ...options,
    throttle: {
      onRateLimit: (retryAfter, options) => {
        octokit.log.warn(
          `Request quota exhausted for request ${options.method} ${options.url}`
        )
        if (options.request.retryCount <= 2) {
          console.log(`Retrying after ${retryAfter} seconds!`)
          return true
        }
      },
      onSecondaryRateLimit: (retryAfter, options, octokit) => {
        octokit.log.warn(
          `Secondary quota detected for request ${options.method} ${options.url}`
        )
      }
    }
  })
}
