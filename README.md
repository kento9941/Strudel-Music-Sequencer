# Strudel Music Sequencer

This project is a fork of: [Mittans/strudel-reactor](https://github.com/Mittans/strudel_reactor.git)

## Modifications

- Rebuilt UI with react

- Added strudel based music sequencer

- Added D3 based audio visualizer

- Added file handling

- Removed unused original features

## Demo

**Live Demo on Vercel**
https://strudel-music-sequencer.vercel.app

## Bars and Notes

![Bars and Notes](/public/Bar.png)

- One bar consists of 4 beats and 16 notes, represented by white squares.

- To add a note, click a black square to turn it white. Click a white square to delete a note.

- To open "Note Settings", click the double black line on the note (the red square shown above).

Keyboard, guitar, bass and synth instruments all have "Note Settings".

Drums do not, because drum notes have no pitch.

## Note Settings

![Note Settings](/public/Note-Settings.png)

- To adjust a note's pitch, select a radio button. In the image above, "C1" is the lowest C note and "C6" is the highest.

- To adjust duration, use the duration control at the bottom-left. This is adjustable in increments of 0.25.

- To adjust volume, use the volume slider at the button-right.

## Tracks

![Tracks (Note))](/public/Tracks.png)

**↑ Note track**

![Tracks (Drums)](/public/Drum-Tracks.png)

**↑ Drum track**

Each track contains 2 bars (32 notes) by default.

- To adjust track volume, use the volume slider. This applies to all notes in the track. You can mute the track with the speaker icon.

- To reset a track, click the Reset button on the far right. This resets the track volume and deletes its notes, but **does not** reset the number of bars.

## Add / Delete Bars

![Add / Delete Bars](/public/Add-Delete-Bars.png)

- To add a bar, press "Add Bar". A new bar will appear on the far right.

- To delete a bar, press "Delete". A confirmation dialog will appear - select "Yes" to delete the rightmost bar, or select "Cancel" to keep it.

## Instrument Settings

![Instrument Settings](/public/Instrument-Settings.png)

- To select the instrument brands, use the brand selector on the bottom-left. This affects all tracks for that instrument.

- To adjust the volume, use the volume slider. This affects all tracks for that instrument.

- To play the instrument, press the ▶ button.

## Global Settings

![Global Settings](/public/Global-Settings.png)

- To adjust the BPM, use the BPM control. This applies to all instruments.

- To play all instruments together, press "Play All ▶".

## Files

![Files](/public/Files.png)

You can manage your files and projects from the ≡ menu.

- "Create New" creates a new project.

- "Open JSON" loads a project from a JSON file.

- "Save As JSON" exports the current project to a JSON file.

## /my_music

This folder stores your project JSON files. It includes "Firefly - Jim Yosef.json" by default, which is the author's (Kento Kawazoe) remix of [Jim Yosef - Firefly (NCS Release)](https://youtu.be/x_OwcYTNbHs?si=Whu2cGaWDM46Zf4W)

## Tech Stack

- React
- Bootstrap 5
- Zustand
- D3.js
- Strudel

## Contact

Author: Kento Kawazoe

GitHub: [https://github.com/kawky008](https://github.com/kawky008)

Email: kento9941@gmail.com
