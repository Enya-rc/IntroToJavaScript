/**
 * @copyright: (C) 2020 Vancouver Film School.  All Rights Reserved.
 * @author:    EnyaRodriguez{@link mailto:dd46enya@vfs.com}
 * @version:   1.0
 */
'use strict';

// import PlayList from './PlayList.js';
import Track from './Track.js';
// import * as PlayList from './PlayList.js';
// import { realpathSync } from 'fs';

export default class MediaManager {

    constructor () {

        this.config = {

            apiKey: "AIzaSyBenwm7cXVkEGBlBaqbpQilSx0iIcmgTuc",
            authDomain: "vfs-mediaplayer-4a628.firebaseapp.com",
            databaseURL: "https://vfs-mediaplayer-4a628.firebaseio.com",
            projectId: "vfs-mediaplayer-4a628",
            storageBucket: "vfs-mediaplayer-4a628.appspot.com",
            messagingSenderId: "858192019109",
            appId: "1:858192019109:web:98b2db548d62779645d74c"
          };

        //   this.songData = null;
        //   this.media = null;

        firebase.initializeApp (this.config);
        this.db = firebase.firestore();
        this.media = firebase.storage();


    }

    //methods to fetch the song/playlist
    fetchPlaylist(playListName = "all") {

        //this is all going to be asychronous
        return new Promise ( async ( resolve, reject) => {
           
            // go FETCH
            let mediaList = this.db.collection("media");
            let query = mediaList.where("playlistName","==", playListName);
            let resultList = await query.get();

            if (resultList == undefined)
                reject ({errorCode: 303, errorMsg:"It Failed"});

            // let counter = resultList.docs.length;


console.log("problem passing this point, i tryed for a long time im sorry TT-TT")
            let fetchList = resultList.docs.map (  async docs => {
        
                let musicData = doc.data();
                //posible error media uri
                let mediaRef = this.media.ref (musicData.mediaURI);
        console.log("FINALLY!!")
                musicData.uri = await mediaRef.getDownloadURL().catch(error => {
                    this.handleFirebaseError (error)
                });
                let track = new Track (musicData);
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