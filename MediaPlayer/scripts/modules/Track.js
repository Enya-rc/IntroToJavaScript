/**
 * @copyright: (C) 2020 Vancouver Film School.  All Rights Reserved.
 * @author:    EnyaRodriguez{@link mailto:dd46enya@vfs.com}
 * @version:   1.0
 */
'use strict';

const Reader = jsmediatags.Reader;

export default class Track {

    constructor( mediaData ) { //firebase data

        /*
        {
            id: reference storage
        }
    
        */
       console.log("TRACK");

       this.name = "unknown";
       this.artist = "TBD";
       this.albumImage = "TBD";
       this.album = "TBD";
       this.year = "TBD";
       this.duration = "TBD";
       this.media = "";

        if(mediaData)
            this.update (mediaData);

        this.sound = undefined;

    }
    

    play() {
        if (this.sound == undefined){
            return;
        }

        this.sound.play();
    }

    stop() {
        if (this.sound == undefined){
            return;
        }

        this.sound.stop();
    }

    currentDuration() {

        let currentDuration = this.duration - this.progress;
        return currentDuration;
    }

    update(mediaData){
        this.name = mediaData.trackName;
        this.artist = "TBD";
        this.albumImage = "TBD";
        this.album = "TBD";
        this.year = "TBD";
        this.duration = "TBD";
        this.media = mediadata.mediaURI;
    }

    updateMedia (songURI){

        this.sound = new buzz.sound(mediaURI)
   /*     jsmediatags.read (songURI, {
            onSuccess(tag) { 
                this.name = tag.title
                this.artist = tag.artist;
                this.album = tag.album;
                this.year = tag.year;
                this.genre = tag.genre;
                this.salbumImage = tag.picture;
                this.duration = this.sound.getDuration();
                this.media = mediaFile;
            },
            onError(error) {
            console.log(':(', error.type, error.info);
            }
        })
       */

    }
}

