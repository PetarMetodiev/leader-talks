$(function () {
	$('.blog-item').on('click', '#remove-button', function (event) {
		var objectId = $(this).data('id');
		var url = '/posts/single/' + objectId;

		$.ajax({
			url: url,
			method: 'DELETE',
			success: function (res) {
				location.reload();
			}
		});
	});

	$('.relative-date').each(function(index, date){
		var dbDate = $(this).text();
		$(this).text(moment(new Date(dbDate)).calendar());
	})

	$('.truncate').succinct({
		size: 500 // max number of characters to be shown.
	});
});
