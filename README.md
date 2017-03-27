# KOLEO Widget

Widget KOLEO, to prosty sposób, by dodać [wyszukiwarkę rozkładu jazdy z cenami pociągów](https://koleo.pl) na swoją stronę.

[Podgląd widgetu](https://widget.koleo.pl)

# Aby umieścić widget na stronie
Wersja uproszczona: umieść poniższy fragment w wybranym miejscu w pliku HTML.
```
<div id="koleo-widget-container" class="koleo-widget-container"></div>
<script src="https://widget.koleo.pl/widget/javascripts/load-widget-simple.js"></script>
```
[Przykładowe użycie](https://widget.koleo.pl/example_embed_simple.html)

Alternatywnie: Umieść następujący skrypt uzupełniając argument `selektor` odpowiednią wartością, wskazującą na istniejący element HTML.
```
  var el = document.createElement('script');
  document.head.appendChild(el);
  el.src = 'https://widget.koleo.pl/widget/javascripts/load-widget.js';
  el.onload = function(script){
      KoleoWidgetLoader.loadWidget(`selektor`);
  };
```

[Przykładowe użycie](https://widget.koleo.pl/example_embed.html)

# Licencja

Copyright © 2015-2017 Astarium. Wszelkie prawa zastrzeżone. 
