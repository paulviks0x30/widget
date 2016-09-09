$(document).on('ready', function() {
	insertWidget();
	addStyles();
	bindDatePicker();
	showLiveSearch();

	$('#koleo-widget').on('submit', function(event) {
		event.preventDefault();

		var startStation = parameterize($('#start_station').val());
		var endStation = parameterize($('#end_station').val());
		var formattedDate = formatDate($('#date').val());
		var date = new Date(formattedDate);

		var day = ('0' + date.getDate()).slice(-2);
		var month = ('0' + (date.getMonth() + 1)).slice(-2);
		var year = date.getFullYear();
		var hour = ('0' + date.getHours()).slice(-2);
		var minutes = ('0' + date.getMinutes()).slice(-2);

		var koleoDate = day + '-' + month + '-' + year + '_' + hour + ':' + minutes;

		window.location = 'http://koleo.pl/search/' + startStation + '/' + endStation + '/' + koleoDate + '?location=' + window.location; 
	});
});

function insertWidget() {
	var html = '<img src="http://koleo.pl/assets/logo.png"><form id="koleo-widget"><input id="start_station" name="start_station" type="text" placeholder="OD"><input id="end_station" name="end_station" type="text" placeholder="DO"><input id="date" name="date" type="text" placeholder="KIEDY"><input id="submit" type="submit" value="Znajdź połączenie"></form>'
	var container = $('.koleo-widget-container');
	container.append(html);
}

function addStyles() {
	var cssLink = $("<link>", { rel: "stylesheet", type: "text/css", href: "widget/widget.css" });
	var cssLink2 = $("<link>", { rel: "stylesheet", type: "text/css", href: "widget/autocomplete.css" });
	var cssLink3 = $("<link>", { rel: "stylesheet", type: "text/css", href: "widget/awesomecomplete.css" });
	var cssLink4 = $("<link>", { rel: "stylesheet", type: "text/css", href: "widget/foundation-datetimepicker.css" });
	var cssLink5 = $("<link>", { rel: "stylesheet", type: "text/css", href: "https://fonts.googleapis.com/css?family=Roboto" });

	cssLink.appendTo('head');
	cssLink2.appendTo('head');
	cssLink3.appendTo('head');
	cssLink4.appendTo('head');
	cssLink5.appendTo('head');
}

function showLiveSearch() {
	$('#start_station, #end_station').awesomecomplete({
	  	noResultsMessage: 'Nie ma takiej stacji.',
	  	dataMethod: getData,
	  	valueFunction: function(dataItem) {
		    return dataItem.name;
		},
		renderFunction: function(dataItem) {
			return '<p class="title">' + dataItem.name + '</p>';
		},
		highlightMatches: false,
		typingDelay: 200
	});
}

var getData = function(term, $awesomecomplete, onData) {
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
}

function bindDatePicker() {
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
}

function formatDate(foundationFormatDate) {
	var day = foundationFormatDate.substr(0, 2);
	var month = foundationFormatDate.substr(3, 2);
	var year = foundationFormatDate.split(' ')[0].split('-').pop();
	var hour = foundationFormatDate.split(' ').pop();

	return year + '-' + month + '-' + day  + 'T' + hour;
}
