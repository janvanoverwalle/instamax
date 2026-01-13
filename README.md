# Instamax

_Dedicated to Maxime, to help keep her memory alive._

<!--
## Create converter executabe
* Install `pyinstaller` if not already installed
    * `pip install pyinstaller`
* Run `pyinstaller --onefile converter.py`
* See `dist` folder for executable file
-->

## How it works
Open `instamax.html` using your preferred browser (it should work on all modern browsers).

> NOTE: If you see the following text, go to the [Setup](#setup) section.

    There doesn't seem to be anything here.
    Have you run the converter?

There are 3 buttons at the top of the overview page:
*   ![album](assets/images/header-black-minimal.png "Album") always brings you back to the initial overview page.
*   ![sorting](assets/icons/sort-alpha-down.svg "Sorting") is used to sort by upload date (newest or oldest first).
*   ![light-theme](assets/icons/sun-fill.svg "Light theme") or ![dark-theme](assets/icons/moon-stars-fill.svg "Dark theme") is used for switching the theme (light or dark). This automatically tries to match your computer's theme.

You can scroll through the overview; more posts will be loaded as you scroll down.

Once you scroll down a bit, a button will appear in the bottom right corner that will bring you back to the top of the page.

### Posts

Clicking a photo or video opens that post.
*   Posts marked with a ![album](assets/icons/files.svg "Album") icon consist of multiple photos and/or videos.

### Navigation
Posts can be directly navigated using the ![left](assets/icons/chevron-left.svg "Left") or ![right](assets/icons/chevron-right.svg "Right") buttons, or by using the left and right arrow keys on your keyboard.

They can be closed by clicking the ![close](assets/icons/x.svg "Close") button (top right corner), hitting `Escape` on your keyboard, or clicking outside the post.

### Content
Videos can be paused by clicking on them.
*   If they have sound it will be automatically muted but can unmuted by clicking the ![volume](assets/icons/volume-mute-fill.svg "Volume") button in the bottom right corner of the video.

Descriptions can be scrolled through if they are long enough. The same goes for posts consisting of multiple photos or videos.
*   Tags in descriptions can be clicked to view all posts with that tag.

## Setup
Just in case it becomes necessary, here are the steps needed to convert and move all the photos and videos to their proper place so that everything works.
> NOTE: This normally shouldn't be necessary, only if you don't see any post on the overview page.

#### Windows
1.  Have all the photos and videos, as well as the `csv`/`Excel` file that contains all the post information in the same folder as this (the `instamax` location).
2.  Run the `converter.exe` program in the `scripts` folder.

#### Mac / Linux
> Assumes Python is installed on your computer.
1. Same as step 1 on Windows.
2. Open a terminal window.
    * !! Change the working directory to this location (the `instamax` location).
3. Run this command: `python -m scripts\converter.py`

If everything worked as it should, there should be a `data` folder containing an `images` folder (which houses all the photos) and a `videos` folder (which houses all the videos).
The `csv`/`Excel` file should have been moved to the `data` folder as well, and there should also be a `posts-info.js` file now.

## Updates
If there are ever any issues or errors or things that you want to have changed or added, you can contact me at [instamaxigram32@gmail.com](mailto:instamaxigram32@gmail.com).

There are 2 scripts included that can download the latest version of Instamax (if there are any changes). This way it is possible for me to fix or improve anything in the future with as little hassle as possible for you.
*   `updater.bat` is for Windows.
*   `updater.sh` is for Max / Linux.

## Backup
Should you ever need or want it, a complete backup version of Instamax can be downloaded [here](https://drive.google.com/file/d/1RgUURO5-dGE1BjZ-aH1OUETkzEOauIBI/view?usp=sharing) or by scanning the QR code:

![backup](assets/images/qr-backup.png "Backup")

> NOTE: It is recommended to run the updater after downloading (and extracting) the backup to ensure you have the latest version of everything.
