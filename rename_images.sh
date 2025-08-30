#!/bin/bash

# Script to rename image files to remove spaces and special characters
cd "/Users/michaelhemker/music-portfolio/public/images/art"

# 2024 folder
cd 2024
for file in *" "*; do
    if [ -f "$file" ]; then
        newname=$(echo "$file" | sed 's/ /_/g' | sed "s/'//g")
        mv "$file" "$newname"
        echo "Renamed: $file -> $newname"
    fi
done

# 2022 folder
cd ../2022
# These seem to be already properly named

# drawings folder
cd ../drawings
for file in *" "*; do
    if [ -f "$file" ]; then
        newname=$(echo "$file" | sed 's/ /_/g' | sed 's/&/and/g')
        mv "$file" "$newname"
        echo "Renamed: $file -> $newname"
    fi
done

echo "Image renaming complete!"