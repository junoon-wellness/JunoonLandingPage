#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"

HOLD=1.85; FADE=0.28; FPS=30
W=590; H=1280
SEGF=65
FRAMES=(frames/01-the-way-in.png frames/02-onboarding.png frames/03-plan-reveal.png \
        frames/04-plan-tab.png frames/05-edit-sheet.png frames/06-coach.png \
        frames/07-library.png frames/08-ritual.png)
N=${#FRAMES[@]}

IN=()
for f in "${FRAMES[@]}"; do IN+=(-loop 1 -t 4 -i "$f"); done
IN+=(-loop 1 -t 4 -i "${FRAMES[0]}")   # the wrap copy

FC=""
for ((i=0; i<=N; i++)); do
  # ⚠️ THE WRAP COPY DOES NOT ZOOM.
  # Every other segment ramps 1.00 -> 1.03. If the wrap copy did too, the last
  # frame would sit at a different scale from frame 0 and the loop would pop.
  # Holding it at 1.0 makes the end state identical to the start state.
  if [ "$i" -eq "$N" ]; then Z="1"; else Z="1+0.03*on/($SEGF-1)"; fi
  FC+="[$i:v]scale=1572:3408:force_original_aspect_ratio=increase,"
  FC+="zoompan=z='$Z':d=$SEGF:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${W}x${H}:fps=$FPS,"
  FC+="setsar=1,format=yuv420p[v$i];"
done
PREV="[v0]"
for ((k=1; k<=N; k++)); do
  OFF=$(python3 -c "print(round($k*$HOLD, 3))")
  FC+="${PREV}[v$k]xfade=transition=fade:duration=$FADE:offset=$OFF[x$k];"
  PREV="[x$k]"
done
# Run a few frames PAST the final crossfade so the clip ends on a fully
# resolved frame 1 rather than 96% of the way through the blend.
TAIL=0.2
TOTAL=$(python3 -c "print(round($N*$HOLD+$FADE+$TAIL, 3))")
FC+="${PREV}trim=0:$TOTAL,setpts=PTS-STARTPTS[out]"

echo "segments=$((N+1))  total=${TOTAL}s  ${W}x${H}@${FPS}"
ffmpeg -y -hide_banner -loglevel error "${IN[@]}" -filter_complex "$FC" \
  -map "[out]" -an \
  -c:v libx264 -profile:v main -pix_fmt yuv420p -crf 23 -preset slow \
  -movflags +faststart -g $((FPS*2)) \
  out/mock-tour.mp4

ffmpeg -y -hide_banner -loglevel error -i out/mock-tour.mp4 -vframes 1 out/mock-tour-poster.png
