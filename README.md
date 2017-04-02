# MuseChords - Desktop App

MuseChords is a multi-platform Chord-Sheet-Management Software that follows a cloud-based approach.
Chord Sheets are synced to your Server automatically. If you don't have an internet connection though, you can use your chord sheets from the last synchronization locally. Until now it isn't possible to edit your chord sheets while offline.

## The easy way: Get the MuseChords binaries (incl. Android)
Please note that MuseChords is in it's first beta version and may be very buggy and uncomplete. Please look at the feature list to see which ones are currently implemented and which ones will follow.

If you don't wanna build MuseChords from the source code, you can download the binaries for Windows, Mac and Linux here:
https://cloud.teier.eu/s/KUA3EXPsvyVuMoa
The binaries for the Android App are also available there, but the source code for them, won't be published until the next version, because the current Android App is written by a colleague of mine (who is totally fine with me distributing the .apk-File). In Beta 0.2 there will be a totally re-written open-source Android App.

Please note that you have to have a Server to run the App. The Server-Application and setup instructions are available under: https://github.com/glenroy37/musechords-api


## Setup the development environment

If you want to develop MuseChords, you have to install Node.JS from nodejs.org. I recommend to use the LTS-Version.
After Node.JS is ready clone from the git repository and type "npm install" in your Terminal to download all dependencies.
Furthermore you have to install angular-cli and electron-prebuilt globally with following commands:
"npm install angular-cli -g"
"npm install electron-prebuilt -g"
You may have to run those commands with sudo-Permissions.

Now you can start the Angular development server with: "ng serve" and open up the App with "npm run electron".

## Build MuseChords from the Source Code

To build MuseChords from the Source Code you have to setup your development environment as above.
Furthermore you have to install "electron-packager" with "npm install electron-packager -g"
Build the App with "npm run build" and package it with: "electron-packager . MuseChords --platform=<your_platform>"
Now you are ready to go!

## Feature List Desktop

As of Beta Version 0.1 following features are implemented into the Desktop-App:
* Creating, Editing, Viweing and Deleting Chord Sheets
* Transposing Chords
* Viewing already synchroized chords offline

Following Features will follow in Version 0.2
* PDF-Export to print Chord Sheets
* Auto-Scroll on Desktop

Following Features will be implemented later:
* Full Offline Capabilities


## Feature List Android (will be moved to it's own Repository with next version)

As of Beta Version 0.1 following features are implemented into the Android-App:
* Viewing Chord-Sheets with Chords in a different Coulor than the lyrics
* Transposing Chords
* Viewing already synchronized chords offline
* Auto-Scroll through chords

Following features will be implemented later:
* Mobile Chord Editor
* Full Offline Capabilities
