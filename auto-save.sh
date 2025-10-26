#!/bin/bash
cd "/Users/lucianodelusarreta/Desktop/LILY WORK/WEBSITE"
while true; do
  if [[ -n $(git status --porcelain) ]]; then
    git add .
    git commit -m "Auto-update: $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin main
    echo "Auto-saved at $(date)"
  fi
  sleep 60
done
