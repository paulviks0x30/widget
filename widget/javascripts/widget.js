$(document).on('ready', function() {
	KoleoWidget.insertWidget();
	KoleoWidget.addStyles();
	KoleoWidget.bindDatePicker();
	KoleoWidget.showLiveSearch();

	$('#koleo-widget').on('submit', function(event) {
		event.preventDefault();

		var startStation = KoleoWidget.parameterize($('#start_station').val());
		var endStation = KoleoWidget.parameterize($('#end_station').val());
		var formattedDate = KoleoWidget.formatDate($('#date').val());
		var date = new Date(formattedDate);

		if (isNaN(date.valueOf())) {
			date = new Date();
		}

		var day = ('0' + date.getDate()).slice(-2);
		var month = ('0' + (date.getMonth() + 1)).slice(-2);
		var year = date.getFullYear();
		var hour = ('0' + date.getHours()).slice(-2);

		var koleoDate = day + '-' + month + '-' + year + '_' + hour + ':00';

		window.location = 'http://koleo.pl/search/' + startStation + '/' + endStation + '/' + koleoDate + '?location=' + window.location; 
	});
});

var SPECIAL_CHAR_REGEXP      = (/[_|\/|\s]+/g),
    NON_ALPHA_NUMERIC_REGEXP = (/[^a-z0-9\-]+/gi),
    MULTI_SEPARATOR_REGEXP   = (/[\-]+/g),
    TRIM_SEPARATOR_REGEXP    = (/^-+|-+$/g),
    TRIM_WHITESPACE_REGEXP   = (/^(\s|\u00A0)+|(\s|\u00A0)+$/g),
    MULTI_WHITESPACE_REGEXP  = (/\s+/g),
    POLISH_CHARS             = [/[ąĄ]/g, /[ćĆ]/g, /[ęĘ]/g, /[łŁ]/g, /[ńŃ]/g, /[óÓ]/g, /[śŚ]/g, /[żŻ]/g, /[źŹ]/g],
    POLISH_CHAR_REPLACEMNETS = ['a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z'],
    SEPARATOR = '-', SPACE = ' ', EMPTY = '',
    TYPE_UNDEFINED = 'undefined';

var KoleoWidget = {
	insertWidget: function() {
		var html = '<a href="https://koleo.pl"><img src="http://koleo.pl/assets/logo.png"></a><form id="koleo-widget"><input id="start_station" name="start_station" type="text" placeholder="Z"><input id="end_station" name="end_station" type="text" placeholder="DO"><input id="date" name="date" type="text" placeholder="KIEDY"><input id="submit" type="submit" value="Znajdź połączenie"></form>'
		var container = $('.koleo-widget-container');
		container.append(html);
	},

	addStyles: function() {
		var cssLink = $("<link>", { rel: "stylesheet", type: "text/css", href: "widget/stylesheets/widget.css" });
		var cssLink2 = $("<link>", { rel: "stylesheet", type: "text/css", href: "widget/stylesheets/autocomplete.css" });
		var cssLink3 = $("<link>", { rel: "stylesheet", type: "text/css", href: "widget/stylesheets/awesomecomplete.css" });
		var cssLink4 = $("<link>", { rel: "stylesheet", type: "text/css", href: "widget/stylesheets/foundation-datetimepicker.css" });

		cssLink.appendTo('head');
		cssLink2.appendTo('head');
		cssLink3.appendTo('head');
		cssLink4.appendTo('head');
	},

	showLiveSearch: function() {
		$('#start_station, #end_station').awesomecomplete({
		  	noResultsMessage: 'Nie ma takiej stacji.',
		  	dataMethod: this.getData,
		  	valueFunction: function(dataItem) {
			    return dataItem.name;
			},
			renderFunction: function(dataItem) {
				return '<p class="title">' + dataItem.name + '</p>';
			},
			highlightMatches: false,
			typingDelay: 200
		});
	},

	getData: function(term, $awesomecomplete, onData) {
		$.ajax({
			url: 'http://koleo.pl/ls?callback=?&q=' + term,
			type: 'js',
			dataType: 'jsonp',

			success: function(data) {
			   onData(data.stations);
			},

			error: function(data) {
				onData([]);
			}
		});
	},

	bindDatePicker: function() {
		var dateInput = $('#date');
	    var today = new Date();
	    var year = today.getFullYear();
	    var month = today.getMonth();
	    var day = today.getDate();
	    var hour = today.getHours() + 1;
	    
	    dateInput.fdatetimepicker({
	        format: 'dd-mm-yyyy hh:ii',
	        language: 'pl',
	        weekStart: 1,
	        minView: 1,
	        startDate: new Date(year, month, day, hour),
	        endDate: new Date(2016, 11, 12, 23)
	    });
	},

	formatDate: function(foundationFormatDate) {
		var day = foundationFormatDate.substr(0, 2);
		var month = foundationFormatDate.substr(3, 2);
		var year = foundationFormatDate.split(' ')[0].split('-').pop();
		var hour = foundationFormatDate.split(' ').pop();

		return year + '-' + month + '-' + day  + 'T' + hour;
	},

	parameterize: function(string, wordLimit) {
	    for (var i = 0; i < POLISH_CHARS.length; i++) {
	      	string = string.replace(POLISH_CHARS[i], POLISH_CHAR_REPLACEMNETS[i]);
	    }

	    if(wordLimit && typeof wordLimit === 'number') {
	      	string = string.replace(TRIM_WHITESPACE_REGEXP, EMPTY)
	                     .replace(MULTI_WHITESPACE_REGEXP, SPACE)
	                     .split(SPACE)
	                     .join(SPACE);
	    }

	    return string.replace(SPECIAL_CHAR_REGEXP, SEPARATOR)    // replace underscores, slashes and spaces with separator
	                 // .replace(NON_ALPHA_NUMERIC_REGEXP, EMPTY)   // remove non-alphanumeric characters except the separator
	                 .replace(MULTI_SEPARATOR_REGEXP, SEPARATOR) // replace multiple occurring separators
	                 .replace(TRIM_SEPARATOR_REGEXP, EMPTY)      // trim leading and trailing separators 
	                 .replace('.', SEPARATOR)                    // replace dots with separator
	                 .toLowerCase();                             // convert to lowercase

	}
}