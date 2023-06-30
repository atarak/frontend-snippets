(function () {
    const $audio = document.getElementById('audio-player');
    const $albums = document.getElementById('albums');
    const $prevBtn = document.getElementById('prev-btn');
    const $nextBtn = document.getElementById('next-btn');
    const $songsContent = document.getElementById('songs-content');
    const $songsProgressMini = document.getElementById('song-progress-mini');
    const $songsProgressLarge = document.getElementById('song-progress-large');
    const $playerMini = document.getElementById('player-mini');
    const $playerLarge = document.getElementById('player-large');
    const $playerExit = document.getElementById('player-exit');
    const $songsTitleMini = document.getElementById('song-title-mini');
    const $songsTitleLarge = document.getElementById('song-title-large');
    const $songsImageMini = document.getElementById('song-image-mini');
    const $songsImageLarge = document.getElementById('song-image-large');
    const $songsArtistMini = document.getElementById('song-artist-mini');
    const $songsArtistLarge = document.getElementById('song-artist-large');
    const $current = document.getElementById('current');
    const $duration = document.getElementById('duration');
    const $playBtn = document.getElementById('play-btn');
    const $pauseBtn = document.getElementById('pause-btn');
    const $toggleBtn = document.getElementById('toggle');
    const $forwardBtn = document.getElementById('forward');
    const $backwardBtn = document.getElementById('backward');
    const $lowVolumeBtn = document.getElementById('low-volume-btn');
    const $highVolumeBtn = document.getElementById('high-volume-btn');
    const $volumeSlider = document.getElementById('volume');
    let current = 0;
    const songs = [
        {
            title: 'Kangaroo',
            artist: 'NBSP',
            imgURL: 'https://images.unsplash.com/photo-1528728935509-22fb14722a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29uZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60',
            songURL: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3'
        },
        {
            title: 'Sevish',
            artist: 'NBSP',
            imgURL: 'https://images.unsplash.com/photo-1528728935509-22fb14722a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29uZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60',
            songURL: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3'
        },
        {
            title: 'Theme 01',
            artist: 'NBSP',
            imgURL: 'https://images.unsplash.com/photo-1528728935509-22fb14722a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29uZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60',
            songURL: 'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3'
        },
        {
            title: 'Paza Moduless',
            artist: 'NBSP',
            imgURL: 'https://images.unsplash.com/photo-1528728935509-22fb14722a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29uZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60',
            songURL: 'http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3'


        }
    ];

    function render() {
        loadSongs();

        $prevBtn.onclick = function () {
            $albums.scrollLeft -= 240;
        }

        $nextBtn.onclick = function () {
            $albums.scrollLeft += 240;
        }

        $lowVolumeBtn.onclick = function () {
            if ($volumeSlider.value > 5) {
                $volumeSlider.value -= 5;
                $volumeSlider.setAttribute('style', `--volume: ${$volumeSlider.value}%`);
                $audio.volume = $volumeSlider.value / 100;
            }
        }

        $highVolumeBtn.onclick = function () {
            if ($volumeSlider.value < 95) {
                $volumeSlider.value += 5;
                $volumeSlider.setAttribute('style', `--volume: ${$volumeSlider.value}%`);
                $audio.volume = $volumeSlider.value / 100;
            }
        }

        $audio.ontimeupdate = function () {
            const progress = ($audio.currentTime / $audio.duration) * 100;
            $songsProgressMini.setAttribute('style', `--progress: ${progress}%`);
            $songsProgressLarge.setAttribute('style', `--progress: ${progress}%`);
            $current.textContent = formatTime(`${progress}`);
            $duration.textContent = formatTime(`${$audio.duration}`);
        }

        $audio.onended = goForward;

        $playBtn.addEventListener('click', () => {
            if ($audio.paused) {
                $audio.play();
            }
        });

        $pauseBtn.addEventListener('click', () => {
            const $icon = $toggleBtn.querySelector('.fa-solid');
            $audio.pause();
            $icon.classList.remove('fa-pause');
            $icon.classList.add('fa-play');
        });

        $toggleBtn.addEventListener('click', () => {
            const $icon = $toggleBtn.querySelector('.fa-solid');
            if ($audio.paused) {
                $icon.classList.remove('fa-play');
                $icon.classList.add('fa-pause');
                $audio.play()
            } else {
                $icon.classList.remove('fa-pause');
                $icon.classList.add('fa-play');
                $audio.pause()
            }
        });

        $playerMini.addEventListener('click', () => {
            $playerLarge.classList.remove('translate-y-full');
            $playerLarge.classList.add('translate-y-0');
        });

        $playerExit.addEventListener('click', () => {
            $playerLarge.classList.add('translate-y-full');
            $playerLarge.classList.remove('translate-y-0');
        });

        $forwardBtn.addEventListener('click', goForward);

        $backwardBtn.addEventListener('click', goBackward);

        $volumeSlider.addEventListener('input', (event) => {
            const $target = event.target;
            const { value } = $target;
            $target.setAttribute('style', `--volume: ${value}%`);
            $audio.volume = value / 100;
        })
    }

    function loadSongs() {
        songs.forEach((song, index) => {
            $songsContent.appendChild(createSong(song, index));
        })
    }

    function createSong(song, index) {
        const $song = document.createElement('div');
        $song.className = "relative flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-primary-800/50 before:content-[''] before:absolute before:left-4 before:right-4 before:bottom-0 before:h-[1px] before:bg-accent-dark/20";
        $song.onclick = () => {
            current = index;
            play(index);
        };
        $song.innerHTML = `
      <img src="${song.imgURL}" class="w-10 h-10 rounded-full object-cover" alt="">
      <div class="flex-1">
        <h3 class="text-sm text-accent-light leading-none">${song.title}</h3>
        <p class="text-xs leading-none">${song.artist}</p>
      </div>
      <button class="text-[#F66059] transition-all ease hover:text-white">
        <span class="sr-only">Add to playlist</span>
        <i class="fa-solid fa-plus" aria-hidden="true"></i>
      </button>`;
        return $song;
    }

    function play(index) {
        $audio.setAttribute("src", songs[index].songURL);
        $audio.play();
        updateDetails();
    }

    function formatTime(string) {
        var sec_num = parseInt(string, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }

    function updateDetails() {
        const { title, artist, imgURL } = songs[current];
        $songsTitleMini.textContent = title;
        $songsTitleLarge.textContent = title;
        $songsArtistMini.textContent = artist;
        $songsArtistLarge.textContent = artist;
        $songsImageMini.src = imgURL;
        $songsImageLarge.src = imgURL;
    }

    function goForward() {
        if (current < songs.length - 1) {
            current++;
        } else {
            current = 0;
        }
        play(current);
    }

    function goBackward() {
        if (current > 0) {
            current--;
        } else {
            current = songs.length;
        }
        play(current);
    }

    render();
})();

<div class="flex items-center gap-4 px-4 py-2 bg-gray-light rounded mx-auto w-full play-item gcol-played" data-track-info="{&quot;id&quot;:17786,&quot;handle&quot;:&quot;Moduless&quot;,&quot;url&quot;:&quot;https:\/\/freemusicarchive.org\/music\/Paza\/The_Slaphappy_Bee_III_EP\/Moduless\/&quot;,&quot;title&quot;:&quot;Moduless&quot;,&quot;artistName&quot;:&quot;Paza&quot;,&quot;artistUrl&quot;:&quot;https:\/\/freemusicarchive.org\/music\/Paza\/&quot;,&quot;albumTitle&quot;:&quot;The Slaphappy Bee III EP&quot;,&quot;playbackUrl&quot;:&quot;https:\/\/freemusicarchive.org\/track\/Moduless\/stream\/&quot;,&quot;downloadUrl&quot;:&quot;https:\/\/freemusicarchive.org\/track\/Moduless\/download\/&quot;,&quot;fileName&quot;:&quot;Paza_-_01_-_Moduless.mp3&quot;,&quot;fileUrl&quot;:&quot;https:\/\/files.freemusicarchive.org\/storage-freemusicarchive-org\/music\/Creative_Commons\/Paza\/The_Slaphappy_Bee_III_EP\/Paza_-_01_-_Moduless.mp3&quot;}">
    <span class="inline-flex !pr-0"><button title="Play" class="w-6 hover:text-blue"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 485" xml: space="preserve"><path d="M413.974 71.026C368.171 25.225 307.274 0 242.5 0S116.829 25.225 71.026 71.026C25.225 116.829 0 177.726 0 242.5s25.225 125.671 71.026 171.474C116.829 459.775 177.726 485 242.5 485s125.671-25.225 171.474-71.026C459.775 368.171 485 307.274 485 242.5s-25.225-125.671-71.026-171.474zM242.5 455C125.327 455 30 359.673 30 242.5S125.327 30 242.5 30 455 125.327 455 242.5 359.673 455 242.5 455z" fill="currentColor"></path> <path d="M181.062 336.575 343.938 242.5l-162.876-94.075z" fill="currentColor"></path></svg></button></span>
    <span class="inline-flex gap-2 items-center overflow-hidden truncate text-ellipsis">
        <span class="hidden md:inline-flex mr-0.5">
            1.
        </span>
        <a href="https://freemusicarchive.org/music/Paza/The_Slaphappy_Bee_III_EP/Moduless/" title="Moduless" class="inline-flex underline font-[500] decoration-transparent w-full max-w-xs transition-all ease-in-out duration-75 hover:decoration-black">
            Moduless
        </a>
    </span>
    <span class="hidden lg:inline-flex justify-center gap-4 ml-auto px-2">
        <a href="https://freemusicarchive.org/login/" class="transition-colors inline-flex justify-center items-center ease-in-out duration-75 hover:text-blue">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24.963 22.118">
                    <path data-name="Icon feather-heart" d="M21.896 3.067a5.858 5.858 0 0 0-8.286 0l-1.129 1.129-1.129-1.129a5.86 5.86 0 1 0-8.286 8.286l1.129 1.129 8.286 8.286 8.286-8.286 1.129-1.129a5.858 5.858 0 0 0 0-8.286Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.7"></path>
                </svg> </span>
        </a>
        <a href="#" class="inline-flex justify-center items-center add-to-mix" title="Add to Mix">
            <span class="inline-flex justify-center items-center w-4 transition-colors ease-in-out duration-75 hover:text-blue">
                <svg data-name="Icon feather-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.049 22.049">
                    <path data-name="Path 668" d="M11.025 0v22.049" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="3"></path>
                    <path data-name="Path 669" d="M0 11.025h22.049" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="3"></path>
                </svg>
            </span>
        </a> <a href="https://freemusicarchive.org/login/" class="inline-flex justify-center items-center w-4 transition-colors ease-in-out duration-75 hover:text-blue" title="Login">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.596 24.363" class="w-4">
                <g data-name="Icon feather-arrow-down" fill="none" stroke="currentColor">
                    <path data-name="Path 663" d="M10.689 0v17.848" stroke-linejoin="round" stroke-width="2.7"></path>
                    <path data-name="Path 664" d="m19.613 8.924-8.924 8.924-8.924-8.924" stroke-linejoin="round" stroke-width="2.7"></path>
                    <path data-name="Line 121" stroke-linecap="round" stroke-width="2.6" d="M1.3 23.063h18.996"></path>
                </g>
            </svg>
        </a>
    </span>
    <span class="w-12 lg:ml-0 ml-auto inline-flex justify-end items-center">
        02:59
    </span>
</div>

https://freemusicarchive.org/music/Paza/The_Slaphappy_Bee_III_EP/Moduless/title:Moduless,artistName:Paza,artistUrl&quot;:&quot;
https: \/\/freemusicarchive.org\/music\/Paza\/&quot;,&quot;albumTitle&quot;:&quot;The Slaphappy Bee III EP&quot;,&quot;playbackUrl&quot;:&quot;https:\/\/freemusicarchive.org\/track\/Moduless\/stream\/&quot;,&quot;downloadUrl&quot;:&quot;https:\/\/freemusicarchive.org\/track\/Moduless\/download\/&quot;,&quot;fileName&quot;:&quot;Paza_-_01_-_Moduless.mp3&quot;,&quot;fileUrl&quot;:&quot;
https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Creative_Commons/Paza/The_Slaphappy_Bee_III_EP/Paza_-_01_-_Moduless.mp3