/**
 * @copyright: (C) 2020 Vancouver Film School.  All Rights Reserved.
 * @author:    EnyaRodriguez{@link mailto:dd46enya@vfs.com}
 * @version:   1.0
 */
'use strict';

import Track from './Track.js';
import MediaManager from './MediaManager.js';

export default class PlayList {

    constructor(){
        this.playList = [];  // a list of Track objects
        this.current = -1; //out of bounds until playlist loaded
        this.currentTrack = null; //track object

        this.mediaMgr = new MediaManager();
    
    }

    populate() {
       
        //go ask media manager to get media files
        return new Promise ( async ( resolve, reject ) => {
            
            this.playList = await this.mediaMgr.fetchPlaylist().catch( error =>{
                console.log(error);
                reject(error)
            });
            
            this.first()
            resolve(this.playList)
        })
    }

    first() {
        this.current = 0;
        this.currentTrack = this.playList[ this.current ];
    }

    last() {}


    play() {
        if (this.currentTrack == null)
            return;

        this.currentTrack.play();
    }

    stop() {
        if (this.currentTrack == null){
            return;
        } 
        this.currentTrack.stop();
    }

    prevSong() {
        if(this.current <1){
            //cant go back further
            return;
        }
        this.current --;
        this.currentTrack = this.playList[ this.current ];
    }

    nextSong() {
        if(this.current >= this.playList.length){
            return;
        }
        this.current ++;
        this.currentTrack = this.playList[ this.current ];
    }
}




 // this.playList.push( new Track ('../media/Calle13-ElAguante.mp3'));
        // this.playList.push( new Track ('../media/Residente-Rene.mp3'));
        // this.playList.push( new Track ('../media/Residente-HijosDelCañaveral.mp3'));

        // return new Promise (async (resolve, reject) => {

        //     this.PlayList = this.mediaMgr.fetchPlaylist("media")
            
        // })
