# Instamax

_Dedicated to Maxime, to help keep her memory alive._

<!--
## Create converter executabe
* Install `pyinstaller` if not already installed
    * `pip install pyinstaller`
* Run `pyinstaller --onefile converter.py`
* See `dist` folder for executable file
-->

## Hoe het werkt
Open `instamax.html` gebruikmakend van jouw favoriete browser (het zou op alle moderne browsers moeten werken).

> NOTA: Als je de volgende tekst ziet, ga dan naar de [Setup](#setup) sectie.

    There doesn't seem to be anything here.
    Have you run the converter?

Er zijn 3 knoppen bovenaan de overzicht pagina:
*   ![album](assets/images/header-black-minimal.png "Album") brengt je altijd terug naar de initiële overzicht pagina.
*   ![sorteren](assets/icons/sort-alpha-down.svg "Sorteren") wordt gebruikt om te sorteren volgens upload datum (nieuwste of oudste eerst).
*   ![licht-thema](assets/icons/sun-fill.svg "Licht thema") of ![donker-thema](assets/icons/moon-stars-fill.svg "Donker thema") wordt gebruikt om te wisselen van thema (licht of donker). Dit probeert automatisch te matchen met het thema van je computer.

Je kan scrollen doorheen het overzicht, meer posts worden geladen naarmate je naar onder scrolt.

Van zodra je een beetje naar onder hebt gescrold, verschijnt er een knop in de hoek rechts onderaan die je terug naar de top van de pagina brengt.

### Posts

Als je klikt op een foto of video, open je die post.
*   Posts gemarkeerd met een ![album](assets/icons/files.svg "Album") icoon bestaan uit meerdere foto's en/of video's.

### Navigatie
Posts kunnen rechtstreeks genavigeerd worden gebruikmakend van de ![links](assets/icons/chevron-left.svg "Links") of ![rechts](assets/icons/chevron-right.svg "Rechts") knoppen, of door middel van de linker en rechter pijltoetsen op je toetsenbord.

Ze kunnen gesloten worden door te klikken op de ![sluiten](assets/icons/x.svg "Sluiten") knop (rechts bovenaan), `Escape` drukken op je toetsenbord, of buiten de post te klikken.

### Content
Video's kunnen gepauzeerd worden door erop te klikken.
*   Als ze geluid hebben wordt dit automatisch ge-mute, maar dit kan ge-unmute worden door te klikken op de ![volume](assets/icons/volume-mute-fill.svg "Volume") knop rechts onderaan in de video.

Beschrijvingen kunnen gescrold worden als ze lang genoeg zijn. Hetzelfde geldt voor posts met meerdere foto's of video's.
*   Tags in beschrijvingen kunnen geklikt worden om een overzicht te zien van alle posts met die tag.

## Setup
In het geval het nodig zou zijn, hier zijn de stappen om alle foto's en video's te converteren en naar de correcte plaats te zetten zodat alles mooi werkt.
> NOTA: Dit zou normaliter niet nodig moeten zijn, enkel als je geen posts ziet op de overzicht pagina.

#### Windows
1.  Zorg dat alle foto's en video's, alsook het `csv`/`Excel` bestand dat alle post informatie bevat in dezelfde map staat als dit (de `instamax` locatie).
2.  Voer het programma `converter.exe` uit in de `scripts` map.

#### Mac / Linux
> Gaat er vanuit dat Python geïnstalleerd is op je computer.
1. Hetzelfde als stap 1 op Windows.
2. Open een terminal venster.
    * !! Verander de huidige werklocatie naar deze locatie (de `instamax` locatie).
3. Voer dit commando uit: `python -m scripts\converter.py`

Als alles gewerkt heeft zoals het zou moeten, zou er nu een `data` map moeten zijn met daarin een `images` map (waar alle foto's zich in bevinden) en een `videos` map (waar alle video's zich bevinden).
Het `csv`/`Excel` bestand zou ook verplaatst moeten zijn naar de `data` map, en er zou nu ook een `posts-info.js` bestand moeten zijn bijgekomen.

## Updates
In het geval er ooit problemen of fouten zijn of dingen die je graag veranderd of toegevoegd zou zien, kan je mij contacteren via [instamaxigram32@gmail.com](mailto:instamaxigram32@gmail.com).

Er zijn 2 scripts bijgevoegd die de laatste versie van Instamax kunnen downloaden (als er veranderingen zouden zijn). Op deze manier is het mogelijk voor mij om problemen op te lossen of te verbeteren in de toekomst met zo weinig mogelijk impact/gedoe voor jullie.
*   `updater.bat` is voor Windows.
*   `updater.sh` is voor Max / Linux.

## Backup
Moest het ooit nodig zijn, een volledige backup versie van Instamax kan [hier](https://drive.google.com/file/d/1RgUURO5-dGE1BjZ-aH1OUETkzEOauIBI/view?usp=sharing) gedownload worden of door middel van de QR code te scannen:

![backup](assets/images/qr-backup.png "Backup")

> NOTE: Het is aanbevolen om de updater uit te voeren nadat je de backup hebt gedownload (en uitgepakt) om er voor te zorgen dat je de laatste versie hebt van alles.
