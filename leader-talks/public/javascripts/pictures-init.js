$(document).ready(function () {
	$(".fb-album-container").FacebookAlbumBrowser({
		account: 'leadertalks',
		accessToken: "775908159169504|cYEIsh0rs25OQQC8Ex2hXyCOut4",
		showComments: true,
		commentsLimit: 3,
		showAccountInfo: true,
		showImageCount: true,
		showImageText: true,
		shareButton: false,
		albumsPageSize: 0,
		photosPageSize: 0,
		lightbox: true,
		photosCheckbox: true
	});
});