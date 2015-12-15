$(document).ready(function () {
	$(".fb-album-container").FacebookAlbumBrowser({
		account: 'leadertalks',
		accessToken: "775908159169504|cYEIsh0rs25OQQC8Ex2hXyCOut4",
		showComments: true,
		commentsLimit: 10,
		showAccountInfo: true,
		showImageCount: true,
		showImageText: true,
		shareButton: true,
		albumsPageSize: 0,
		photosPageSize: 0,
		lightbox: true,
		skipAlbums: ['Profile Pictures', 'Timeline Photos', 'Cover Photos', 'Mobile Uploads'],
		thumbnailSize: 500,
		photosCheckbox: true,
		addThis: "ra-52638e915dd79612",
		likeButton: true
	});
});