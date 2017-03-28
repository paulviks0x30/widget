KoleoWidgetLoader = {
  loadWidget: function(selector) {
    var scriptPaths = ["https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js",
                       "widget/javascripts/foundation-datepicker.js",
                       "widget/javascripts/jquery.awesomecomplete.js",
                       "widget/javascripts/widget.js"];
    this.loadScripts(scriptPaths, selector);
  },

  loadScripts: function(scripts, selector) { /* http://stackoverflow.com/questions/16230886/trying-to-fire-onload-event-on-script-tag */
        var that = this;
        var script = scripts.shift();
        var el = document.createElement('script');
        document.head.appendChild(el);
        el.onload = function(script){
            if (scripts.length) {
                that.loadScripts(scripts, selector);
            } else {
                KoleoWidget.init(selector);
            }
        };
        el.src = script;
    }
}
