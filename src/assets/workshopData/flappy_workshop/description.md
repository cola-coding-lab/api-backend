![](./img/media/image11.png){width="2.250264654418198in"
height="1.0803379265091864in"}

## Coding Lab − Wie kann ich meine eigene App entwickeln?

Gestalten Sie Ihre eigene App und entwerfen Sie so Ihren ersten eigenen
Prototypen. Auch die Größeren kommen hier nicht zu kurz, denn diese
können hier bereits ihr erstes Spiel implementieren und so erste
Erfahrungen als Spieleentwicklerin oder Spielentwickler sammeln.

### Handout Flappy App

Erstelle deine eigene Variante von Flappy Bird für dein Smartphone in
ein paar einfachen Schritten.
_______________________

**Schritt 1:**

Starte mit dem Cola Editor ein neues Projekt unter
<https://cola.fh-joanneum.at/editor/>

![Graphical user interface, application, Teams Description automatically
generated](./img/media/image2.png){width="3.9994116360454943in"
height="2.815009842519685in"}

Und beginne mit dem Programmieren

![Graphical user interface, application Description automatically
generated](./img/media/image3.png){width="4.127972440944882in"
height="1.943248031496063in"}

**Schritt 2:**

Erstelle ein Objekt (einen Ball) der nach unten fällt

Variablen

> let y = 0;
>
> let step = 2

Zeichen-Funktion

> background(\"lightblue\");
>
> circle(190, y +=step , 30);
>
> step= step\*1.05
>
> if(y \> 377) {
>
> step=0
>
> }

![A picture containing graphical user interface Description
automatically
generated](./img/media/image4.png){width="6.268055555555556in"
height="2.859722222222222in"}

Aufgabe: ändere die Farbe, Größe oder Geschwindigkeit des Balls

**Schritt 3:**

Erstelle eine Aktion per Mouse-Klick oder Touch

> function mouseClicked() {
>
> step = -10
>
> upY = y-100
>
> }

Und etwas Logik, dass der Ball nur etwas nach oben geht

> if(y\<upY && step\<0){
>
> step = 2
>
> }

![Graphical user interface Description automatically
generated](./img/media/image5.png){width="5.948536745406824in"
height="2.506347331583552in"}

**Schritt 4:**

Nun etwas Gamelogik: wenn der Ball den Boden erreicht, ist Game-Over

Variable

let gameIsRunning=true

solange das Spiel läuft, ist alles OK

if (!gameIsRunning){

step=0;

stepRect=0;

textSize(32);

text(\"Game over\",120,120)

}

Wenn der Ball zu Boden fällt, ist Game-Over

if(y \> 377) {

gameIsRunning=false

}

![Graphical user interface, application Description automatically
generated](./img/media/image6.png){width="6.268055555555556in"
height="2.8319444444444444in"}

**Schritt 5:**

Nun ein paar Hindernisse und auch ein Kollisionsabfrage

Variablen für Hindernisse

let rectx = 370

let recty = 270

let stepRect=2

Hindernisse zeichnen, bewegen und wieder ins Bild bringen

> rect(rectx,recty, 30,170)
>
> rectx -= stepRect
>
> if (rectx == -30){
>
> rectx=410
>
> }

Und die Kollision abfragen

> if ( (rectx \> 173) && (rectx \< 207)){
>
> if (y\>270){
>
> console.log(\"hit\")
>
> gameIsRunning=false
>
> }
>
> }

![A picture containing graphical user interface Description
automatically
generated](./img/media/image7.png){width="6.268055555555556in"
height="2.8375in"}

**Schritt 6:**

Nun noch einige Features: Punkte Stand, Beschriftung, und auch ein Vogel

Beschriftungen:

> function draw() {
>
> ..
>
> textSize(32);
>
> text(\"My Flappy\",50,50)
>
> ..

Ein Vogel

> let img
>
> function preload(){
>
> img = loadImage(\'
> data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiwAAAG9CAYAAAA2pS2SAAAPaElEQVR42u3Wsa3CQBBFUScOXSDt0Qo1OHIJJASQbLJUYGmDFcyMz5Nu/rXyZ86ymJmZmZmZnaxL+nlmZgYsErCYmQGLJGAxMwMWCVjMzAxYJGAxMwMWScBiZgYsErCYmQGLJGAxMwMWCVjMzAxYJGAxMwMWScBiZgYsErCYmRmwSMBiZgYskoDFzAxYJGAxMwMWScBiZgYsErCYmRmwSMBiZgYskoDFzAxYJGAxMzNgkYDFzAxYJAGLmRmwSMBiZgYskoDFzAxYJGAxMzNgkYDFzAxYJAGLmRmwSMBiZmbAIgGLmRmwSAIWMzNgkYDFzAxYJAGLmRmwSMBiZmbAIgGLmRmwSAIWMzNgkYDFzMyARQIWM3OIM9R3ZS3i9/R5vzQQRJkZsAALsAALsACLGbAAi4AFWIDFzIAFWAQswAIsZsAiYAEWYAEWYDEDFmARsAhYzAxYgEXAAizAYgYswCJgARZgMTNgARYBC7AAi5kBC7AAC7AAC7CYAQuwCFiABVjMDFiARcACLMBiBiwCFmABFmABFjNgARYBi4DFzIAFWAQswAIsZsACLAIWYAEWMwMWYBGwAAuwmBmwAAuwAAuwAIsZsACLgAVYgMXMgAVYBCzAAixmwCJgARZgARZgMQMWYBGwCFjMDFiARcACLMBiBizAImABFmAxM2ABFgELsACLmQELsAALsAALsJgBC7AIWIAFWMwMWIBFwAIswGIGLAIWYAEWYAEWM2ABFgGLgMXMgAVYBCzAAixmwAIsAhZgARYzAxZgEbAAC7CYGbAAC7AAC7AAixmwAIuABViAxcyABVgELMACLGbAImABFmABFmAxOHCIBQdwIIiCKAMWYBGwOLICFjNgkYBFwAIsBizAImABFgELsBiwOLICFglYzIBFwAIsAhZgMWABFgELsAhYzIBFAhYJWAxYgEXAAiwCFmAxYAEWAYsELGbAIgGLgAVYDFiARcACLAIWYDFgkYBFAhYzYBGwAIuABVgMWIBFwAIsAhYzYJGARQIWAxZgEbAAi4AFWAxYgEXAIgGLGbBIwCJgARYDFmARsACLgAVYDFgkYJGAxQxYBCzAImABFgMWYBGwAIuAxQxYJGCRgMWABVgELMAiYAEWAxZgEbBIwGIGLBKwCFiAxYAFWAQswCJgARYDFglYJGAxAxYBC7AIWIDFgAVYBCzAImAxAxYJWCRgMWABFgELsAhYgMWABVgELBKwmAGLBCwCFmAxYAEWAQuwCFiAxYBFAhYJWBxiCaKABVgEBxe6wcAiYBGwAAuwOMTAAiwCFgGLgAVYgEUCFmABFgELsHgsAYuABViABVi8E7AIWAQsAhY3GFgELA4/sACLgAVYgEXAImARsAALsEjAAizAImABFo8lYBGwAAuwOMTAAiwCFgGLgAVYgEUCFmABFgELsHgsAYuABViABVi8E7AIWAQsAhY3GFgELAIWYBGwAAuwCFgELAIWYAEWCViABVgELMDisQQsAhZgARaHGFiARcAiYBGwAAuwSMACLMAiYAEWjyVgEbAAC7AAi3cCFgGLgEXA4gYDi4BFwAIswOIQAwuwCFgELAIWYAEWCViABVgELMDisQQsAhZgARaHGFiARcAiYBGwAAuwSMACLMAiYAEWjyVgEbAAC7AAi3cCFgGLgEXA4gYDi4BFwAIswOIQAwuwCFgELAIWYAEWCViABVgELMDisQQsAhZgARaHGFiARcAiYBGwAAuwSMACLMAiYAEWjyVgEbAAC7AAy1/fKdwf1lqTpgVRwAIsigoW7wQsErAAC7AIWIAFWAQswAIsAhZgARYJWOTACFi8E7AIWIAFWIAFWHxPwAIsAhZgARY5xMACLBKwAIsDI2ABFmARsAALsAALsAALsACLgEXAImDxTsAiAQuwAIuABViARcACLMAiYAEWYJGABVgcGAGLdwIWAQuwAAuwAIvvCViARcACLMAihxhYgEUCFmBxYAQswAIsAhZgARZgARZgARZgEbAIWAQs3glYJGABFmARsAALsAhYgAVYBCzAAiwSsACLAyNg8U7AImABFmABFmDxPQELsAhYgAVY5BADC7BIwAIsDoyABViARcACLMACLMACLMACLAIWAYuAxTsBiwQswAIsAhZgARYBC7AAi4AFWIBFAhZgcWAELMACLAIWYAEWYAEW3xOwAIuABViARQ4xsACLBCzA4sAIWIAFWAQswAIswAIswAIswCJgEbAIWLwTsEjAAizAImABFmARsAALsAhYgAVYJGABFgdGwAIswCJgARZgARZg8T0BC7BIEAVRECWwAxYJWIAFWBxZAQuwSMAiYBGwAAuwCFiABViARcACLBKwAAuwSMACLBKwAAuwCFiARQIWYAEWYBGwAIsELMACLBKwAIsELMACLAIWYJGABViARQIWYJGARcAiYAEWYBGwAAuwAIuABVgkYAEWYJGABVgkYAEWYBGwAIsELMACLMAiYAEWCVhABFgkYAEWCViABVgELMAiAQuwAIsELMAiAYuARcACLMAiYAEWYAEWAQuwSMACLMAiAQuwSMACLMAiYAEWCViABViARcACLBKwwAiwSMACLBKwAAuwCFiARQIWYAEWCViARQIWAYuABViARcACLMACLAIWYJGABViARQIWYJGABViARcACLBKwAAuwAIuABVgkYBGwSMACLBKwAAuwCFiARQIWYAEWCViARQIWAYuABViARcACLMACLAIWYJGABViARQKWmT3va7gc2bxF/J6ARdURJQELsAhYgEXAImABFmABFmARsEjAAiwCFmARsEjAAiwCFmABFglYgEXAAiwCFglYgEXAAiwCFglYgAVYgAVYgEUCFmARsACLgEUCFmARsACLgEXAAizAAizAImCRgAVYBCzAImCRgAVYBCzAAiwSsACLgAVYBCwSsACLgAVYBCwSsAALsAALsACLBCzAImABFgGLBCzAImABFgGLgAVYgAVYgEXAIgELsAhYgEXAIgELsAhYgAVYJGABFgELsAhYJGABFgELsAhYJGABFmABFmABFglYgEXAAiwCFglYgEXAAiwCFgELsAALsACLgEUCFmARsACLgEUCFmARsAALsEjAAiwCFmARsEjAAiwCFmARsEjAAizAAizAAiwSsACLgAVYBCwSsACLgAVYBCwCFmABFmABFgGLBCzAImABFgGLBCzAImABFmCRKoEl4iBKcCA4GP19uq1S6YAFWIAFWAQsErAAi4AFWIAFWCRgARYBi4DFQROwAAuwAAuwCFgkYAEWAYuABVgkYAEWAYuARQIWYBGwAAuwAIsELMAiYBGwAIuABViABViARcAiAQuwCFiABViARQIWYBGwCFgcNAELsAALsACLgEUCFmARsAhYgEUCFmARsAhYJGABFgELsAALsEjAAiwCFgELsAhYgAVYgAVYBCwSsACLgAVYgAVYJGABFgGLgEUCFmABFmABFgGLBCzAImARsACLBCzAAizAImCRgAVYBCzAAizAIgELsAhYBCzAImABFmABFmARsEjAAiwCFmABFmCRgAVYBCwCFglYgAVYgAVYBCwSsACLgEXAAiwSsAALsACLgEUCFmARsAALsACLBCzAImARsACLgAVYgAVYgEXAIgELsAhYgAVYgEUCFmARsAhYJGABFmABFmARsEjAkmNdOTsem5IGB8M/5lL1DFiARcACLBKwAIuARcACLBKwAIuABViAxf+5gMWABVgELMAiAQuwCFgELMAiAQuwAIvDDyzAIgELsAhYBCzAIgELsAhYgAVYgEXAYsACLAIWYJGABVgELAIWYJGABVgELMACLBKwGLAAi4AFWCRgARYBi4AFWCRgARZgEbAAiwQswCJgEbAAiwQswCJgARZgARYBiwELsAhYgEUCFmARsAhYgEUCFmARsAALsEjAYsACLAIWYJGABVgELAIWYJGABViARcACLBKwAIuARcACLBKwAIuABViABVgELAYswCJgARYJWIBFwCJgARYJWIBFwAIswCIBiwELsAhYgEUCFmARsAhYgEUCFmABFgELsEjAAiwCFgELsEjAAiwCFmABFmARsBiwAIuABVgkYAEWAYuABVgkYAEWAQuwAIsELOZjARYBC7BIwAIsDrEEUXUQpbwBC7AAiwQswCJgARZgkQQsErAYsEgCFgELsAALsEjAAiwCFmABFknAIgELsACLBCzAImABFmABFglYgEXAYsAiCVgELMACLMAiAQuwCFiABVgkAYsELMACLBKwAIuABViABVgkYAEWAQuwAIskYJGABViARQIWYBGwAAuwAIsELMAiYDFgkQQsAhZgARZgkYAFWAQswAIskoBFAhZgARYJWIBFwAIswAIsErAAi4AFWIBFErBIwAIswCIBC7AIWIAFWIBFAhZgEbAYsEgCFgELsAALsEjAAiwCFmABFknAIgELsACLBCzAImABFmABFglYgEXAAizAIglYJGABFmCRgAVYBCzAAizAIgELsAhYDFgkAYuABViABVgkYAEWAQuwAIskYJGABViARQIWYBGwAAuwAIsELMAiYAEWiLpYjqwgSoIDAxZgkYBFwGIGLMAiAYuAxYAFWCRgkYDFgAVYJGARsBiwCFgELBKwGLAAiwQsAhYzYAEWCVgELAYswOKgCVgkYDFgARYJWAQsZsACLBKwCFgMWIBFAhYJWAxYgEUCFgGLAYuARcAiAYsBC7BIwCJgMQMWYJGARcBiwAIsErBIwGLAAiwSsAhYzIAFWCRgEbAYsACLBCwSsBiwAIsELAIWAxYBi4BFAhYDFmCRgEXAYgYswCIBi4DFgAVYJGCRgMWABVgkYBGwmAELsEjAImAxYAEWCVgkYDFgARYJWAQsBiwCFgGLBCwGLMAiAYuAxQxYgEUCFgGLAQuwSMAiAYsBC7BIwCJgMQMWYJGARcBiwAIsErBIwGLAAiwSsAhYzAzs5MCYmRmwSMBiZmbAIgGLmRmwSMBiZmbAIgGLmZkBiwQsZmbAIgGLmZkBiwQsZmYGLAIWMzMDFglYzMwMWCRgMTMDFglYzMwMWCRgMTMzYJGAxcwMWCRgMTMzYJGAxczMgEXAYmZmwCIBi5mZAYsELGZmwCIBi5mZAYsELGZmBiwSsJiZAYsELGZmBiwSsJiZGbAIWMzMDFgkYDEzM2CRgMXMDFgkYDEzM2CRgMXMzIBFAhYzM2CRgMXMzIBFAhYzMwMWAYuZmQGLBCxmZgYsErCYmQGLBCxmZgYsErCYTdwXntsd1Nb0qOwAAAAASUVORK5CYII=\');

}

Und nun kann man seine Fantasie freien Lauf lassen: Levels, Power-Ups,
Gegner, Bosse, ...

**Schritt 7:**

Um die App auf dein Smartphone zu bekommen, gehe auf **Export als PWA**

![Graphical user interface, text, application Description automatically
generated](./img/media/image8.png){width="5.620155293088364in"
height="2.014314304461942in"}

Gib einen Namen und eine Beschreibung für deine App ein

![Graphical user interface, application Description automatically
generated](./img/media/image9.png){width="3.5789096675415575in"
height="2.138384733158355in"}

Gehe auf den Link oder scanne den QR Code mit deinem Smartphone.

![Qr code Description automatically
generated](./img/media/image10.png){width="3.298423009623797in"
height="2.461573709536308in"}

Fertig ist dein eigenes Flappy-Game.

![Graphical user interface, text, application Description automatically
generated](./img/media/image11.png){width="2.6073097112860895in"
height="2.7485914260717412in"}

<https://vcl-api.rigbit.at/public/f0b29d4c-b292-5abb-9a44-62c5486ef97e/>
