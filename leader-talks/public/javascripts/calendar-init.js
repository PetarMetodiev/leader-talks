(function () {
	$(document).ready(function () {
		$('#calendar').fullCalendar({
			googleCalendarApiKey: 'AIzaSyCyPG-dosncLVvuu1eIATwqYo7IPFfAdRk',
			// googleCalendarSecret: 'pDeGROqtqAV4JMZSwKlzpFP6',
			events: {
				googleCalendarId: 'leadertalkss@gmail.com'
			},
			header: {
				left: 'title',
				center: 'month, basicWeek, basicDay',
				right: 'today prev,next'
			},
			theme: true,
			themeButtonIcons: false,
			firstDay: 1
		})
	});
} ());