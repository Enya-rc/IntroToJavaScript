/**
 * @copyright: (C) 2020 Vancouver Film School.  All Rights Reserved.
 * @author:    EnyaRodriguez{@link mailto:dd46enya@vfs.com}
 * @version:   1.0
 */
'use strict';

import PlayList from './PlayList.js';
// import * as PlayList from './PlayList.js';
import { realpathSync } from 'fs';

export default class MediaManager {

    constructor () {

        this.config = {
            apiKey: "AIzaSyBenwm7cXVkEGBlBaqbpQilSx0iIcmgTuc",
            authDomain: "vfs-MediaPlayer.firebaseapp.com",
            databaseURL: "https://vfs-MediaPlayer.firebaseio.com",
            projectId: "vfs-MediaPlayer",
            storageBucket: "vfs-MediaPlayer.appspot.com",
            messagingSenderId: "858192019109",
            appId: "vfs-MediaPlayer",
          };

        //   this.songData = null;
        //   this.media = null;


        firebase.initializeApp (this.config);
        this.songData = firebase.firestore();
        this.media = firebase.storage();


    }

    //methods to fetch the song/playlist
    fetchPlaylist(playListName = "all") {

        //this is all going to be asychronous
        return new Promise ( async ( resolve, reject) => {
           
            // let aPlaylist = [];
            let mediaList = this.data.collection("media");
            let query = mediaList.where("playlistName","==", playListName);

            //got fetch
            let resultList = await query.get();

            if (resultList == undifined)
                reject ({errorCode: 303, errorMsg:"It Failed"});

            // let counter = resultList.docs.length;

            let fetchList = resultList.docs.map (async doc => {
                
                let musicData = doc.data();
                let track = new Track( musicData);
                let songURI = await this.fetchSongFromStorage( playListName, musicData.mediaURI)
                
                track.updatemedia( songURI );
                return track
            })

            const aPlaylist = await Promise.all (fetchList);
            resolve(aPlaylist);
                
            })
    }

 

fetchSongFromStorage( playlist, filename ){
        return new Promise (async (resolve, reject) => { 

            let mediaList = this.db.collection("media")
            let query = mediaList.where ("playlistName" , "==", playlist)
                                    .where("mediaURI", "==", filename); 

            let result = await query.get();
            let ref = this.media.ref( result.id );
            
            let songURI = await ref.child(filename).getDownloadURL();
            resolve (songURI)
        })
    }
}