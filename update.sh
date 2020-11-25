#!/bin/bash

set -o errexit
set -o nounset

keystroke="CTRL+F5"

# set to whatever's given as argument, defaults to firefox
# BROWSER="${1:-firefox}"
# find all visible browser windows
browser_windows="$(xdotool search --sync --all --onlyvisible --name " Google Chrome")"
# Send keystroke
sleep 1
for bw in $browser_windows; do
    xdotool windowfocus "$bw"
    xdotool key --window "$bw" "$keystroke"
done