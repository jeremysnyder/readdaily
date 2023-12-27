#!/bin/bash

python3 process-reading-plan-csv.py
rm -rf ../public/data/chapter-bible-reading-plan
mkdir -p ../public/data/
mv ./chapter-bible-reading-plan/ ../public/data/chapter-bible-reading-plan/
