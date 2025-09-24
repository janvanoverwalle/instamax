window.onload = onWindowLoad;

function onWindowLoad() {
    document.querySelector('.prev-post').addEventListener('click', displayPreviousPost);
    document.querySelector('.next-post').addEventListener('click', displayNextPost);

    document.addEventListener('keydown', function(event) {
        if (event.code == 'ArrowLeft') {
            displayPreviousPost();
        }
        if (event.code == 'ArrowRight') {
            displayNextPost();
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get('post_id');
    if (!postId) {
        postId = localStorage.getItem('post-id');
    }
    const post = postId ? findPostById(postId) : POSTS_INFO[0];
    displayPost(post);

    if (findPostById(post.post_id, -1) === undefined) {
        document.querySelector('.prev-post').classList.add('d-none');
    }
    if (findPostById(post.post_id, 1) === undefined) {
        document.querySelector('.next-post').classList.add('d-none');
    }
}

function displayPost(post) {
    const container = document.querySelector('.container')
    container.setAttribute('post-id', post.post_id);
    localStorage.setItem('post-id', post.post_id);

    // document.title = document.title.split('-', 2)[0] + '- ' + (post.description ?? 'Post');

    if (post.filename.endsWith('.mp4')) {
        try {
            displayVideo(post.filename);
        }
        catch {
            console.error('Failed to display video: ' + post.filename);
        }
    }
    else {
        try {
            displayImage(post.filename);
        }
        catch {
            console.error('Failed to display image: ' + post.filename);
        }
    }

    try {
        displayDescription(post.description);
    }
    catch {
        console.error('Failed to display description');
    }

    try {
        displayComments(post.comments);
    }
    catch {
        console.error('Failed to display comments');
    }

    try {
        displayLikes(post.likes);
    }
    catch {
        console.error('Failed to display likes');
    }

    try {
        displayDate(post.filename);
    }
    catch {
        console.error('Failed to display date');
    }
}

function displayImage(imageFilename) {
    document.querySelector('.video').replaceChildren();
    const imageContainer = document.querySelector('.image');
    imageContainer.replaceChildren();

    const img = document.createElement('img');
    img.setAttribute('src', 'data/images/' + imageFilename);
    img.setAttribute('alt', imageFilename.split('.').slice(0, -1).join());
    img.setAttribute('width', '100%');
    img.classList.add('rounded');

    imageContainer.appendChild(img);
}

function displayVideo(videoFilename) {
    document.querySelector('.image').replaceChildren();
    const videoContainer = document.querySelector('.video');
    videoContainer.replaceChildren();

    const source = document.createElement('source');
    source.setAttribute('src', 'data/videos/' + videoFilename);
    source.setAttribute('type', 'video/mp4');

    const text = document.createTextNode('Your browser does not support the video tag.');

    const video = document.createElement('video');
    video.classList.add('clickable', 'rounded');
    video.setAttribute('width', '100%');
    // video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.appendChild(source);
    video.appendChild(text);
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        }
        else {
            video.pause();
        }
    });

    const mute = document.createElement('img');
    mute.setAttribute('src', 'assets/icons/volume-mute-fill.svg');
    mute.setAttribute('alt', 'mute');
    mute.classList.add('volume-button', 'clickable');

    video.addEventListener('loadeddata', () => {
        if (video.mozHasAudio || Boolean(video.webkitAudioDecodedByteCount) || Boolean(video.audioTracks?.length)) {
            mute.addEventListener('click', () => {
            if (video.muted) {
                mute.setAttribute('src', 'assets/icons/volume-up-fill.svg');
                mute.setAttribute('alt', 'unmute');
            }
            else {
                mute.setAttribute('src', 'assets/icons/volume-mute-fill.svg');
                mute.setAttribute('alt', 'mute');
            }
            video.muted = !video.muted;
        });
        }
    });

    videoContainer.appendChild(video);
    videoContainer.appendChild(mute);
}

function displayComments(comments) {
    document.querySelector('.amount-comments').textContent = comments;
    document.querySelector('.post-comments').textContent = 'comment' + (comments === '1' ? '' : 's');
}

function displayLikes(likes) {
    document.querySelector('.amount-likes').textContent = likes;
    document.querySelector('.post-likes').textContent = 'like' + (likes === '1' ? '' : 's');
}

function displayDescription(description) {
    const descriptionContainer = document.querySelector('.description');
    descriptionContainer.replaceChildren();

    const lines = description.split(/\n/);
    for (const line of lines) {
        const span = document.createElement('span');
        span.innerHTML = highlightTags(line);
        descriptionContainer.appendChild(span);
        descriptionContainer.appendChild(document.createElement('br'));
    }
    descriptionContainer.removeChild(descriptionContainer.lastChild);
}

function highlightTags(description) {
    return description.replaceAll(/(#\S+)/g, (s) => {
        return '<a href="overview.html?tag=' + s.slice(1) + '" class="tag">' + s + '</a>';
    });
}

function displayDate(filename) {
    const dateString = filename.split('_')[0];
    const [ year, month, day ] = dateString.split('-');
    const date = new Date(Number(year), Number(month)-1, Number(day));
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.querySelector('.post-date').textContent = date.toLocaleDateString(undefined, options);
}

function displayPreviousPost() {
    const container = document.querySelector('.container')
    const postId = container.getAttribute('post-id');
    const post = findPostById(postId, -1);
    if (post) {
        displayPost(post);

        document.querySelector('.next-post').classList.remove('d-none');
        if (findPostById(post.post_id, -1) === undefined) {
            document.querySelector('.prev-post').classList.add('d-none');
        }
    }
}

function displayNextPost() {
    const container = document.querySelector('.container')
    const postId = container.getAttribute('post-id');
    const post = findPostById(postId, 1);
    if (post) {
        displayPost(post);

        document.querySelector('.prev-post').classList.remove('d-none');
        if (findPostById(post.post_id, 1) === undefined) {
            document.querySelector('.next-post').classList.add('d-none');
        }
    }
}
