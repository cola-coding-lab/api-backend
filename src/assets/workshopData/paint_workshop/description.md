![](./img/media/image1.png)

## Coding Lab − Wie kann ich meine eigene App entwickeln?

Gestalten Sie Ihre eigene App und entwerfen Sie so Ihren ersten eigenen
Prototypen. Auch die Größeren kommen hier nicht zu kurz, denn diese
können hier bereits ihr erstes Spiel implementieren und so erste
Erfahrungen als Spieleentwicklerin oder Spielentwickler sammeln.

###Handout Paint App

Erstelle eine eigene Zeichenapp für dein Smartphone in ein paar
einfachen Schritten.

**Schritt 1:**

Starte mit dem Cola Editor ein neues Projekt unter
<https://cola.fh-joanneum.at/editor/>

![Graphical user interface, application, Teams Description automatically
generated](./img/media/image2.png)

Und beginne mit dem Programmieren

![Graphical user interface, application Description automatically
generated](./img/media/image3.png)

**Schritt 2:**

Zeichne einen ersten Kreis mit folgendem Code

 	
     fill(color(\'red\'));
     circle (200,150, 20)

![Graphical user interface, application Description automatically
generated](./img/media/image4.png)

Aufgabe: Zeichen weitere Kreise, dazu kanns du die X und Y Koordinate,
den Radius oder die Farbe ändern

	fill(color('blue'));
	circle (100,50, 400)

**Schritt 3:**

Erstelle eine Aktion per Mouse-Klick oder Touch

	function mouseDragged() {
	
	   fill(color('red'));
	   circle(mouseX, mouseY, 20);
	
	}

![Graphical user interface, text, application Description automatically
generated](./img/media/image5.png)

**Schritt 4:**

Um die App auf dein Smartphone zu bekommen, gehe auf **Export als PWA**

![Graphical user interface, application Description automatically
generated](./img/media/image6.png)

Gib einen Namen und eine Beschreibung für deine App ein

![Graphical user interface, application Description automatically
generated](./img/media/image7.png)

Gehe auf den Link oder scanne den QR Code mit deinem Smartphone.

![Qr code Description automatically
generated](./img/media/image8.png)
Fertig ist deine erste eigene App!

![A picture containing arrow Description automatically
generated](./img/media/image9.png)