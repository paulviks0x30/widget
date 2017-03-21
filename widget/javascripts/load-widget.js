KoleoWidgetLoader = {
  loadWidget: function(selector) {
    var scriptPaths = ["https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js",
                       "http://widget.koleo.pl/widget/javascripts/foundation-datepicker.js",
                       "http://widget.koleo.pl/widget/javascripts/jquery.awesomecomplete.js",
                       "http://widget.koleo.pl/widget/javascripts/widget.js"];
    var that = this;
    this.loadScripts(scriptPaths, selector);
  },

  loadScripts: function(scripts, selector) { /* http://stackoverflow.com/questions/16230886/trying-to-fire-onload-event-on-script-tag */
        var that = this;
        var script = scripts.shift();
        var el = document.createElement('script');
        document.body.appendChild(el);
        el.onload = function(script){
            if (scripts.length) {
                that.loadScripts(scripts, selector);
            } else {
                KoleoWidget.init($(selector.selector));
            }
        };
        el.src = script;
    }
}
