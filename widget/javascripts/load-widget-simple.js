var el = document.createElement('script');
document.head.appendChild(el);
el.src = '//widget.koleo.pl/ssbo/widget/javascripts/load-widget.js';
el.onload = function(){
    KoleoWidgetLoader.loadWidget(document.getElementsByClassName('koleo-widget-container'));
};
