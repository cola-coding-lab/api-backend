## Erstelle eine Aktion per Mouse-Klick oder Touch

```
function mouseClicked() {
   step = -10;
   upY = y - 100;
}
```
Und etwas Logik, dass der Ball nur etwas nach oben geht
```
if(y < upY && step < 0) {
   step = 2;
}
```
![Graphical user interface Description automatically
generated](./image5.png)