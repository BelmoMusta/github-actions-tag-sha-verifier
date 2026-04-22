# github-actions-tag-sha-verifier
## Goal and motivation
The objective of this action is to track the integrity of the references, (tags or branches), used to call
some known gitHub actions.

The motivation comes from the fact that the mentioned references will eventually change without any prior notice.
Then, the end users may be using an unwanted version of the action that will not suite the goal of their workflows.

The majority of the gitHub actions use major tags that sum up all the minor, path and hotfix versions. This allows the
actions maintainers to point the major tag to the commit SHA of the latest update.

In the vision of the user, the tag did not change, but concretely it did.

## How it works
The action needs an `action-lock.json` file, that holds static information about how the integrity check will be done.

A built-in example of this file is bundled with this action, it can be overridden using the input `lock-file-location`.

The action will loop over the `locked-actions`, then matches the mentioned reference commit against the actual existing
one in the repository of the action.

A report object is produced at the end of the loop, it will be exported as both of `markdown` and `json` formats