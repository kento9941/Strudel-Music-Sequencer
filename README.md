# Strudel Music Sequencer

A modern, browser-based music sequencer built with React and powered by the Strudel live coding environment. Create, edit, and visualize musical patterns with an intuitive grid-based interface.

This project is a fork of: [Mittans/strudel-reactor](https://github.com/Mittans/strudel_reactor.git)

## Features

- Modern, responsive UI built with React
- Grid-based step sequencer for notes and drum patterns
- Multiple instruments (keyboard, guitar, bass, synth, drums)
- Per-note controls for pitch, duration, and volume
- Per-track and per-instrument volume controls and mute
- Global transport with BPM control and "Play All" support
- Built-in D3-based audio visualizer
- Project file management with JSON import/export
- Example project included in `/my_music` to explore the sequencer

## Modifications

- Rebuilt UI with React

- Added Strudel-based music sequencer

- Added D3-based audio visualizer

- Added file handling

- Removed unused original features

## Setup

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/kawky008/Strudel-Music-Sequencer.git
cd Strudel-Music-Sequencer
npm install
```

### Running the app locally

```bash
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173` or similar) in your browser.

### Building for production

```bash
npm run build
```

Serve the generated files from the `dist` directory using your preferred static file host.

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

## Contributing

Contributions, issues, and feature requests are welcome. If you’d like to contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes with clear messages
4. Open a pull request describing your changes

## License

This project follows the same license as the original `strudel-reactor` project. See the `LICENSE` file in this repository for full details.

## Acknowledgements

- Original project: [Mittans/strudel-reactor](https://github.com/Mittans/strudel_reactor.git)
- Strudel live coding environment
- Open-source libraries listed in the Tech Stack section

## Contact

Author: Kento Kawazoe

GitHub: [https://github.com/kawky008](https://github.com/kawky008)

Email: kento9941@gmail.com
