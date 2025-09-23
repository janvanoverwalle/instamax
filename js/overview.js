window.onload = onWindowLoad;

function onWindowLoad() {
    sortPosts('asc');

    const grid = document.querySelector('.overview-grid');
    createRow(grid);
    loadAdditionalPosts(60);

    document.addEventListener('scroll', () => {
        if ((window.innerHeight + Math.ceil(window.pageYOffset + 1)) >= document.body.offsetHeight) {
            loadAdditionalPosts(60, document.querySelectorAll('.thumbnail-column').length);
        }

        const scrollToTopThreshold = 50;
        const scrollTopButton = document.querySelector('.scroll-to-top');
        if (document.body.scrollTop > scrollToTopThreshold || document.documentElement.scrollTop > scrollToTopThreshold) {
            scrollTopButton.classList.remove('d-none'); // Enable
        } else {
            scrollTopButton.classList.add('d-none'); // Disable
        }
    });

    document.querySelector('.sort-date').addEventListener('click', (e) => {
        const isAscending = e.target.getAttribute('alt').includes('asc');
        const direction = isAscending ? 'desc' : 'asc'; // Flip direction
        sortPosts(direction);
        e.target.setAttribute('alt', 'sort-' + direction);
        e.target.setAttribute('title', 'Sort ' + (isAscending ? 'oldest' : 'newest') + ' first');
        e.target.setAttribute('src', 'assets/icons/sort-numeric-' + (isAscending ? 'up' : 'down') + '.svg');

        document.querySelector('.thumbnail-row').replaceChildren();
        loadAdditionalPosts(60);
    });

    document.querySelector('.scroll-to-top').addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
}

function loadAdditionalPosts(numToLoad, start) {
    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get('tag');
    const row = document.querySelector('.thumbnail-row');
    for (let i = (start ?? 0); i < POSTS_INFO.length; i++) {
        if (tag && !POSTS_INFO[i].description.includes(tag)) {
            continue;
        }

        const column = createColumn(row, null);
        createThumbnail(POSTS_INFO[i], column);

        // Only show a subset during dev
        if ((i-(start ?? 0)) === (numToLoad-1)) {
            break;
        }
    }
}

function createRow(parent) {
    const row = document.createElement('div');
    row.classList.add('row', 'thumbnail-row');
    if (parent) {
        parent.appendChild(row);
    }
    return row;
}

function createColumn(row, width) {
    const col = document.createElement('div');
    if (width === null) {
        col.classList.add('col');
    }
    else {
        col.classList.add('col-' + (width ?? 2));
    }
    col.classList.add('thumbnail-column');
    if (row) {
        row.appendChild(col);
    }
    return col;
}

function createThumbnail(post, column) {
    let mediaElement;
    if (post.filename.endsWith('.mp4')) {
        const source = document.createElement('source');
        source.setAttribute('src', 'data/' + post.filename);
        source.setAttribute('type', 'video/mp4');

        const text = document.createTextNode('Your browser does not support the video tag.');

        mediaElement = document.createElement('video');
        mediaElement.autoplay = true;
        mediaElement.muted = true;
        mediaElement.appendChild(source);
        mediaElement.appendChild(text);
    }
    else {
        mediaElement = document.createElement('img');
        mediaElement.setAttribute('src', 'data/' + post.filename);
        mediaElement.setAttribute('alt', post.filename.split('.').slice(0, -1).join());
    }

    mediaElement.setAttribute('width', '100%');
    mediaElement.setAttribute('height', '100%');
    mediaElement.classList.add('thumbnail', 'rounded', 'shadow-sm');

    const a = document.createElement('a');
    a.href = 'viewer.html?post_id=' + post.post_id;
    a.appendChild(mediaElement);

    const container = document.createElement('div');
    container.classList.add('thumbnail-container');
    container.appendChild(a);

    if (column) {
        column.appendChild(container);
    }

    return container;
}
