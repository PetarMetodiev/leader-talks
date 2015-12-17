$(document).ready(function () {
	$(".fb-album-container").FacebookAlbumBrowser({
		account: 'leadertalks',
		accessToken: "1669539846617717|Bji_mIfJuj2yBcWd8Nj19BhM6Pk",
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