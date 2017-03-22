# KOLEO Widget

Widget KOLEO, to prosty sposób, by dodać [wyszukiwarkę rozkładu jazdy z cenami pociągów](https://koleo.pl) na swoją stronę.

[Podgląd widgetu](https://widget.koleo.pl)

# Aby umieścić widget na stronie
Umieść następujący skrypt uzupełniając argument `$(.wybrany-selektor)` odpowiednią wartością.
```
  window.onload = function() {
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = "//widget.koleo.pl/widget/javascripts/load-widget.js";
    script.onload = function(s) { KoleoWidgetLoader.loadWidget($(.wybrany-selektor)) };
  }
```

proponowane użycie pokazane jest w [przykładowym pliku](https://widget.koleo.pl/example_embed.html)
# Licencja

Copyright © 2015-2017 Astarium. Wszelkie prawa zastrzeżone. 
