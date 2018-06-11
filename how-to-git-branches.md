# How to Create \ Merge branches

### Table of contents:

*  [Workflow](#workflow)
*  [Commands](#commands)
      1. [List of branches](#list-of-branches)
      2. [Create a new branch](#create-a-new-branch)
      3. [Push a new branch](#when-you-want-to-push-the-new-branch)
      3. [Move between branches](#move-between-branches)
      4. [Merge branch to the master](#merge-branch-to-the-master)
      4. [Git pull with auto stash](#git-pull-with-auto-stash)
*  [For more information](#for-more-information)

---

I summarized the workflow from multiple sources. Please see the "_[For more information](#for-more-information)_" section.

## Workflow

This is a workflow on how to create, merge and delete new branches.

> For the example the new branch is named: **side-branch**

> The text in the parenthesis are just comments **NOT** real commands.

**Create a new branch and push it to the remote repository**

```bash
git checkout -b side-branch
(do your work on "side-branch")
git status (see that you are in "side-branch")
git add .
git commit -m "updated component A"
git push --set-upstream origin side-branch (push the new branch to the remote repository, if needed)
```

❗❗ In all the next times you can to a normal push:

```bash
git push
```

💡💡 Please note that you don't have to push the new branch in order to merge if there is no need for this branch for the team or for keeping the commits history.

**Merge & Push the new branch to master and delete it**

There are to options:

1. merge
2. cherry-pick

#### merge

```bash
git merge master (still on branch side-branch)
(resolve any merge conflicts if there are any with git add, git commit)
git checkout master
git merge --no-ff side-branch (to log it in the commits)
git branch -d side-branch (this delete the branch on your local machine if you pushed the resolved merge conflicts or there was none)
git branch -D side-branch (if you didn't do the previous command because you didn't need to push the resolved merge conflicts, use this to force delete the branch)
git push
```

#### cherry-pick

You will need the commit ID the first 7 digits are fine but you can take all the number, you will see the commit ID when you will commit in the "_side-branch_". It will look something like this:

```bash
git commit -m "update markdown"
[master 4e8b350] update markdown
 2 files changed, 30 insertions(+), 16 deletions(-)
```

The commit ID is this case is: _**4e8b350**_ .

If you didn't copy the number when you did the commit you can run the command: `git log -1` which will show you the last commit.

💡💡 Please note the number: "**-1**" means how many commits it will show.

```bash
git log -1
commit 4e8b35054b3a5694de145da3dfa2cd2e9dbc3f26 (HEAD -> master)
Author: [THE AUTHOR NAME AND EMAIL]
Date:   Mon Jun 11 09:48:27 2018 +0300

    update markdown
```

**cherry-pick example:**
```bash
git merge master (still on branch side-branch)
(resolve any merge conflicts if there are any with git add, git commit)
git checkout master
git cherry-pick 4e8b350
git branch -d side-branch (this delete the branch on your local machine if you pushed the resolved merge conflicts or there was none)
git branch -D side-branch (if you didn't do the previous command because you didn't need to push the resolved merge conflicts, use this to force delete the branch)
git push
```

❗❗⚡ **Note that** this will only take the specific commit and **not all the history** of the "_side-branch_".

**Delete the remote branch on github**

There are two options:

1. [Using github interface](https://help.github.com/articles/deleting-and-restoring-branches-in-a-pull-request/)
2. With this command:
   ```bash
   git push origin :side-branch (after this you won't be able to restore the branch using github interface)
   ```

❗❗⚡ **Please note that switching branches carries uncommitted changes with you, either commit it or stash it.** ( [see more](https://stackoverflow.com/questions/5531362/why-git-keeps-showing-my-changes-when-i-switch-branches-modified-added-deleted) ).

---

## Commands:

1. ### List of branches

   *  Only local:
      ```bash
      git branch
      ```
   *  Only remotes:
      ```bash
      git branch -r
      ```
   *  Local and remotes:
      ```bash
      git branch -a
      ```

1. ### Create a new branch

   ```bash
   git checkout -b [NAME_OF_YOUR_NEW_BRANCH]
   ```

   This will create and move to the new branch.

1. ### When you want to push the new branch

   ```bash
    git push --set-upstream origin [NAME_OF_YOUR_NEW_BRANCH]
   ```

1. ### Move between branches

   To master

   ```bash
    git checkout master
   ```

   To exists branch

   ```bash
    git checkout [NAME_OF_YOUR_NEW_BRANCH]
   ```

1. ### Merge branch to the master
   ```bash
    git checkout master
    git merge --no-ff side-branch
   ```

1. ### Git pull with auto stash
      ```bash
      git pull --autostash
      ```
---

## For more information

If you need more information, I pretty much took the information from these places:

*  [Merge Development Branch With master](https://stackoverflow.com/questions/14168677/merge-development-branch-with-master)
*  [The Difference Between git-merge and git-merge-no-ff](https://stackoverflow.com/questions/9069061/what-is-the-difference-between-git-merge-and-git-merge-no-ff)
*  [List Remote Branches](http://gitready.com/intermediate/2009/02/13/list-remote-branches.html)
*  [For more information about Gits Merge Strategies](https://stackoverflow.com/questions/14243397/what-are-gits-merge-strategies)
*  [From here I use took some of the commands, not the Workflow because of it for something else](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches)
