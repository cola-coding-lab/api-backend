## Hindernisse und Kollisionsabfrage
Nun ein paar Hindernisse und auch ein Kollisionsabfrage

### Variablen für Hindernisse
```
let rectx = 370;
let recty = 270;
let stepRect = 2;
```

Hindernisse zeichnen, bewegen und wieder ins Bild bringen
```
rect(rectx, recty, 30, 170);
rectx -= stepRect;

if (rectx == -30) {
    rectx = 410;
}
```

### Kollision
Und die Kollision abfragen

```
if ((rectx > 173) && (rectx < 207)) {
    if (y > 270) {
       console.log("hit");
       gameIsRunning = false;
    }
}
```

![A picture containing graphical user interface Description
automatically
generated](./image7.png)