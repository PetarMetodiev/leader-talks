(function() {
	$('.article').on('click', '#remove-button', function(event) {
		var objectId = $(this).data('id');
		var url = './' + objectId;

		$.ajax({
			url: url,
			method: 'DELETE',
			success: function(res) {
				window.location.href = '/posts'
			}
		});
	});

	$('.article').on('click', '#edit-button', function() {
		var objectId = $(this).data('id');
		var url = './update/' + objectId;

		window.location.href = url;
	});

	$('.relative-date').each(function(index, date) {
		var dbDate = $(this).text();
		$(this).text(moment(new Date(dbDate)).calendar());
	})
}());