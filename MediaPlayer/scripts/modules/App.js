/**
 * @copyright: (C) 2020 Vancouver Film School.  All Rights Reserved.
 * @author:    EnyaRodriguez{@link mailto:dd46enya@vfs.com}
 * @version:   1.0
 */
'use strict';

import PlayList from './PlayList.js';

export default class App {

    constructor(device = 'web') {

        this.trackId = 0;

        // build a playlist
        this.thePlayList = new PlayList();
        this.thePlayList.populate()
            .then(playList => {
                //update UI with new data
                for (let song of playList){
                    let entryMarkup = this.generatePlaylistEntry (1990, song.name, "");
                    $("#the-playlist").append(entryMarkup);
                }
            })

        //Debug playlist editor handeler
        
        $("#playlist-item").on('submit', event => this.addToPlaylist(event));

        // handle user input
        $("#beginning").on("click", event => this.defaultHandler(event));
        $("#prev").on("click", event => this.defaultHandler(event));
        $("#rewind").on("click", event => this.defaultHandler(event));
        $("#play").on("click", event => this.handlePlay(event));
        $("#stop").on("click", event => this.handleStop( event ));
        $("#next").on("click", event => this.defaultHandler(event));
        $("#end").on("click", event => this.defaultHandler(event));
    }

    generatePlaylistEntry (year, name, album){
    return `<li id="item-${this.trackId++}">${year} ${name} - ${album}</li>`
    }

    addToPlaylist (event) {
        event.preventDefault();
        //grab input data into an object
        let name = $('input[name="track-name-entry"]').val();
        let album = $('input[name="track-album-entry"]').val();
        let year = $('input[name="track-year-entry"]').val();

        // append PlayList item to the actual PlayList
            let entryMarkup = this.generatePlaylistEntry (year , name, album);
            $("#the-playlist").append(markup);

    }

    defaultHandler (event){

        $("#virtual-console").html ("something happened");
    }

    handleStop( event ) {

        this.updateCurrentTrack("hello","stop pressed")
        this.thePlayList.stop();
    }

    handlePlay(event){
        this.thePlayList.play();
    }

    nextSong(event){
        this.thePlayList.nextSong();
    }

    updateCurrentTrack( songName = "", userMsg = "Nothing happened") {

        this.currentSongName = songName;
        $("#track-name").val (this.currentSongName);
    }

    run() {

        this.updateCurrentTrack();
        // just waiting around for something to happen...
    }

}