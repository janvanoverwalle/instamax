window.onload = onWindowLoad;

function onWindowLoad() {
    // document.querySelector('.header-image').addEventListener('click', displayPreviousPost);
}

function findPostById(postId, offset) {
    let index = POSTS_INFO.findIndex((p) => p.post_id === String(postId));
    if (offset !== undefined) {
        index += offset
    }
    return POSTS_INFO[index];
}

function sortPosts(direction) {
    if (direction === 'asc') {
        POSTS_INFO.sort((a, b) => a.post_id.localeCompare(b.post_id));
    }
    if (direction === 'desc') {
        POSTS_INFO.sort((a, b) => b.post_id.localeCompare(a.post_id));
    }
}
