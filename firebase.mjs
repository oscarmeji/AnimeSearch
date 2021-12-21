// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, addDoc, getDocs, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDCpTEkyxu8cdM4tERR8q--SkecOKoNYdY",

    authDomain: "dogs-e45eb.firebaseapp.com",

    projectId: "dogs-e45eb",

    storageBucket: "dogs-e45eb.appspot.com",

    messagingSenderId: "328085501273",

    appId: "1:328085501273:web:6c3be804184396f181c848"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


//////////////////////////////////////////////
// exposed functionality for auth
window.login = function(email,password){
    return signInWithEmailAndPassword(auth, email, password);
}

window.signup = function(email,password){
    return createUserWithEmailAndPassword(auth, email, password);
}

window.logout = function(){
    auth.signOut();
}

window.onLogin = function( f ){
    onAuthStateChanged(auth, user => {
        f( user );
    });
}



//////////////////////////////////////////////
// exposed functionality for db
window.addComment = function(comment){
    return addDoc( collection(db, "comments"),
         {comment, createdOn: serverTimestamp() } );
}

window.forEachComment = async function( f ){
    var docs = await getDocs( collection(db, "comments") );
    docs.forEach( doc => f(doc.data()) );
}