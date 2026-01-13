window.addEventListener('load', initOverview);

function initOverview() {
    document.querySelector('.header-image').addEventListener('click', () => {
        console.log(window.location);
        window.location.href = window.location.href.split('?')[0];
    });

    console.log(POSTS_INFO.length + ' posts loaded.');
    if (POSTS_INFO.length > 0) {
        document.querySelector('.no-data').classList.add('d-none');
    }

    clearOverview();
    sortPosts(getCurrentSortDirection());
    loadAdditionalPosts(60);

    document.addEventListener('scroll', () => {
        if ((window.innerHeight + Math.ceil(window.pageYOffset + 1)) >= document.body.offsetHeight) {
            loadAdditionalPosts(60, document.querySelectorAll('.thumbnail-container').length);
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
        e.target.setAttribute('src', 'assets/icons/sort-alpha-' + (isAscending ? 'up' : 'down') + '.svg');

        clearOverview();
        loadAdditionalPosts(60);
    });

    document.querySelector('.scroll-to-top').addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
}

function clearOverview() {
    document.querySelector('.overview-grid').replaceChildren();
}

function getCurrentSortDirection() {
    const sortButton = document.querySelector('.sort-date');
    return sortButton.getAttribute('alt').includes('asc') ? 'asc' : 'desc';
}

function loadAdditionalPosts(numToLoad, start) {
    const tag = getUrlParam('tag');
    const grid = document.querySelector('.overview-grid');
    let postsCreated = 0;
    for (let i = (start ?? 0); i < POSTS_INFO.length; i++) {
        if (tag && !POSTS_INFO[i].description.includes(tag)) {
            continue;
        }

        if (createThumbnail(POSTS_INFO[i], grid)) {
            postsCreated++;
        }

        // Only show a subset during dev
        if ((postsCreated-(start ?? 0)) === numToLoad) {
            break;
        }
    }
}

function setVideoIfExists(videoElement, src, fallbackSrc) {
  const testVideo = document.createElement("video");

  // Important: must set src *before* load()
  testVideo.src = src;

  testVideo.onloadedmetadata = () => {
    // Video exists and is readable
    videoElement.src = src;
    videoElement.load();
  };

  testVideo.onerror = () => {
    // Video does not exist or can't be loaded
    videoElement.src = fallbackSrc;
    videoElement.load();
  };
}

function setImageIfExists(imgElement, url, fallbackUrl) {
  const testImage = new Image();

  testImage.onload = function () {
    imgElement.src = url; // Image exists
  };

  testImage.onerror = function () {
    imgElement.src = fallbackUrl; // Image does not exist
  };

  testImage.src = url;
}

function replaceFilenameIfNecessary(filename) {
    const replaceMap = {
        '2023-11-11_3233600303491110946': '2023-11-11_3233600303490941574',
    };

    for (const [key, value] of Object.entries(replaceMap)) {
        if (filename.includes(key)) {
            return value + '.' + filename.split('.').pop(); // Keep original extension
        }
    }

    return filename;
}

function createThumbnail(post, column) {
    const albumIdentifier = getAlbumIdentifier(post.post_id);
    if (document.querySelector('.thumbnail-container.p' + albumIdentifier)) {
        return;
    }

    const filename = replaceFilenameIfNecessary(post.filename);
    const basename = filename.split('.').slice(0, -1).join();

    let mediaElement;
    if (filename.endsWith('.mp4')) {
        const source = document.createElement('source');
        // source.setAttribute('src', 'data/videos/' + filename);
        source.setAttribute('type', 'video/mp4');

        const text = document.createTextNode('Your browser does not support the video tag.');

        mediaElement = document.createElement('video');
        mediaElement.autoplay = true;
        mediaElement.muted = true;
        mediaElement.loop = true;
        mediaElement.appendChild(source);
        mediaElement.appendChild(text);

        setVideoIfExists(mediaElement, 'data/videos/thumbnails/' + basename + '-thumb.mp4', 'data/videos/' + filename);
    }
    else {
        mediaElement = document.createElement('img');
        // mediaElement.setAttribute('src', 'data/images/' + filename);
        mediaElement.setAttribute('alt', basename);

        setImageIfExists(mediaElement, 'data/images/thumbnails/' + basename + '-thumb.webp', 'data/images/' + filename);
    }

    mediaElement.setAttribute('width', '100%');
    mediaElement.setAttribute('height', '100%');
    mediaElement.classList.add('thumbnail', 'rounded', 'shadow-sm');

    const a = document.createElement('a');
    if (typeof displayPost !== 'undefined') {
        a.classList.add('clickable');
        a.addEventListener('click', () => onPostClick(post.post_id));
    }
    else {
        a.href = 'viewer.html?post-id=' + post.post_id;
    }
    a.appendChild(mediaElement);

    const container = document.createElement('div');
    container.classList.add('thumbnail-container', 'p' + albumIdentifier);
    container.appendChild(a);

    const albumPosts = findPostsFromSameAlbum(post.post_id);
    if (albumPosts.length > 1) {
        const albumIcon = document.createElement('img');
        albumIcon.setAttribute('width', '32');
        albumIcon.setAttribute('src', 'assets/icons/files.svg');
        albumIcon.setAttribute('alt', 'album');
        albumIcon.classList.add('album-icon');
        container.appendChild(albumIcon);
    }

    if (column) {
        column.appendChild(container);
    }

    return container;
}

function onPostClick(postId) {
    const post = findPostById(postId)
    displayPost(post);
    updatePostNavigation(post);
}
