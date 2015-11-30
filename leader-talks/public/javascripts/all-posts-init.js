$(function () {
	$('.blog-item').on('click', '#remove-button', function (event) {
		var objectId = $(this).data('id');
		var url = 'posts/' + objectId;

		$.ajax({
			url: url,
			method: 'DELETE',
			success: function (res) {
				location.reload();
			}
		});
	});

	$('.truncate').succinct({
		size: 500 // max number of characters to be shown.
	});
});
