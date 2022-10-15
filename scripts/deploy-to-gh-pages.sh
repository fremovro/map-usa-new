#!/bin/bash

# Exit with nonzero exit code if anything fails.
set -e

git config user.name "Roman"
git config user.email "fremov.ro@mail.ru"

echo "Start to deploy..."

git checkout --orphan gh-pages
ls -l

git --work-tree ./dist add --all
git --work-tree ./dist commit -m "Deploy to GitHub Pages"
git push -f origin HEAD:gh-pages
rm -r dist

git checkout -f master
git branch -D gh-pages

echo "Successfully deployed"