## Variable
```
let gameIsRunning = true;
```

solange das Spiel läuft, ist alles OK
```
if (!gameIsRunning) {
    step = 0;
    stepRect = 0;
    textSize(32);
    text("Game over", 120, 120)
}
```

Wenn der Ball zu Boden fällt, ist Game-Over.
```
if (y > 377) {
   gameIsRunning=false
}
```

![Graphical user interface, application Description automatically
generated](./assets/image6.png)