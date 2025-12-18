window.onload = onWindowLoad;

function onWindowLoad() {
    // document.querySelector('.header-image').addEventListener('click', displayPreviousPost);
    initTheme();
}

//#region Theme switcher
// Persists choice in localStorage and updates UI
function initTheme() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('sun-fill.svg', 'light');
        updateHeaderImage('header-white.png');
    } else {
        document.documentElement.removeAttribute('data-theme');
        updateThemeIcon('moon-stars-fill.svg', 'dark');
        updateHeaderImage('header-black.png');
    }
}

function updateHeaderImage(source) {
    const image = document.querySelector('.header-image');
    if (!image) return;
    image.setAttribute('src', 'assets/images/' + source);
}

function updateThemeIcon(source, theme) {
    const image = document.querySelector('.theme-toggle');
    if (!image) return;
    image.setAttribute('src', 'assets/icons/' + source);
    image.setAttribute('title', 'Switch to ' + theme + ' mode');
}
//#endregion

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
