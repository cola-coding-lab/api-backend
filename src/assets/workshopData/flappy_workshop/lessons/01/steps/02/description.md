## Objekt erstellen
Ein Objekt beziehungsweise ein Ball fällt nach unten.

### Variablen
```
let y = 0;
let step = 2;
```

### Zeichen-Funktion
```
background("lightblue");
circle(190, y += step, 30);
step = step*1.05;

if(y > 377) {
    step = 0;
}
```

![A picture containing graphical user interface Description
automatically
generated](./image4.png)

### Aufgabe
- ändere die Farbe, Größe oder Geschwindigkeit des Balls