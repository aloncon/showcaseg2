# Git Alias Suggestion

In case you don't want to work with _VIM_ run this command to configure _nodepad++_ as the git editor:

```bash
git config core.editor "'C:\Program Files (x86)\Notepad++\notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
```

Run this command:

```bash
git config --global -e
```

And add this:

> Feel free to change the alias to anything you more convenient to you.

```bash
[alias]
   st = status
   sts = status -s
   stf = "!git fetch; git status"
   ck = checkout
   ci = commit -m
   cia = commit -am
   pulls = pull --autostash
   cpick = cherry-pick
   lg = log --graph --abbrev-commit --date=short --decorate --pretty=format:'%C(magenta)%h%C(reset) - %C(bold cyan)%ad%C(reset) %C(yellow)%d%C(reset) %s %C(green)%cr %C(bold blue)<%an>%C(reset)'
   lgfilter =  "!git lg --grep"
   gconf-e = config --global -e
   gconf-l = config --global --list
   conf-e = config -e
   conf-l = config --list
   la = "!git config -l | grep alias | cut -c 7-"
   stash-c = stash clear
   stash-a = stash apply
   stash-s = stash show
   stash-full = "!git stash clear; git stash show; git stash;"
   change-msg = commit --amend
   reset-ci = reset --soft HEAD^
```

To add a single alias use this command:

```bash
git config --global alias.[THE_ALIAS] [THE_REAL_COMMAND]
```

For example:

```bash
git config --global alias.st status
```

One more thing regarding `git log`, you can add `-[NUMBER]` in the end of the command to limit the number of logs to this mentioned number.

For example with my alias:
```bash
git lg -2
```
