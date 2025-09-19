# Video Conversion Guide for Web Compatibility

## Problem Identified
Your videos are failing because:
- `MyPantry.mp4` and `feed.mp4` are actually **QuickTime MOV files** (not true MP4)
- `short_pantreat_interviews.mp4` is a proper MP4 but may have encoding issues

## File Analysis Results
```
MyPantry.mp4:      ISO Media, Apple QuickTime movie (.MOV/QT) ❌
feed.mp4:          ISO Media, Apple QuickTime movie (.MOV/QT) ❌ 
short_pantreat_interviews.mp4: ISO Media, MP4 v2 [ISO 14496-14] ✅
```

## Solution: Convert Videos to Web-Compatible MP4

### Option 1: Using FFmpeg (Recommended)
```bash
# Install FFmpeg (if not installed)
brew install ffmpeg  # macOS
# or download from https://ffmpeg.org/

# Convert videos to web-compatible MP4
ffmpeg -i "MyPantry.mp4" -c:v libx264 -c:a aac -movflags +faststart "MyPantry_web.mp4"
ffmpeg -i "feed.mp4" -c:v libx264 -c:a aac -movflags +faststart "feed_web.mp4"
ffmpeg -i "short_pantreat_interviews.mp4" -c:v libx264 -c:a aac -movflags +faststart "interviews_web.mp4"
```

### Option 2: Using CloudConvert (Online)
1. Go to https://cloudconvert.com/mov-to-mp4
2. Upload your MOV files
3. Set output format to MP4 with H.264 codec
4. Download converted files

### Option 3: Using HandBrake (GUI Tool)
1. Download HandBrake from https://handbrake.fr/
2. Open your video files
3. Use "Web Optimized" preset
4. Export as MP4

## Web-Compatible Video Requirements
- **Container**: MP4
- **Video Codec**: H.264 (AVC)
- **Audio Codec**: AAC
- **Progressive Download**: faststart flag enabled

## Next Steps
1. Convert the videos using one of the methods above
2. Replace the old files in `/public/projects_assets/pantreat/demo_videos/`
3. Test using the debug pages: `/test-video.html` or `/video-test-page.html`

## Expected Error Codes You'll See
- **Error 3 (DECODE)**: Video format incompatible with browser
- **Error 4 (SRC_NOT_SUPPORTED)**: Codec not supported

After conversion, you should see successful loading messages instead of errors.