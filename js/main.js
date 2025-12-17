window.onload = onWindowLoad;

function onWindowLoad() {
    // document.querySelector('.header-image').addEventListener('click', displayPreviousPost);
}

function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function findPostById(postId, offset) {
    let index = POSTS_INFO.findIndex((p) => p.post_id === String(postId));
    if (offset !== undefined) {
        index += offset
    }
    return POSTS_INFO[index];
}

function findAlbumById(albumId, offset) {
    const album = POSTS_INFO.filter((p) => getAlbumIdentifier(p.post_id) === albumId);
    if (offset === undefined) {
        return album;
    }
    let offsetAlbum = album;
    for (let i = 0; i < Math.abs(offset); i++) {
        const edgePost = offsetAlbum[Math.sign(offset) == -1 ? 0 : offsetAlbum.length - 1];
        const post = findPostById(edgePost.post_id, Math.sign(offset));
        if (!post) {
            return;
        }
        offsetAlbum = findAlbumById(getAlbumIdentifier(post.post_id));
    }
    return offsetAlbum;
}

function getAlbumIdentifier(postId) {
    return postId.substring(0, 10);
}

function findPostsFromSameAlbum(postId) {
    return POSTS_INFO.filter((p) => getAlbumIdentifier(p.post_id) === getAlbumIdentifier(postId));
}

function sortPosts(direction) {
    if (direction === 'asc') {
        POSTS_INFO.sort((a, b) => a.post_id.localeCompare(b.post_id));
    }
    if (direction === 'desc') {
        POSTS_INFO.sort((a, b) => b.post_id.localeCompare(a.post_id));
    }
}
