/*global firebase*/
var config = {
  apiKey: "AIzaSyAiFuzKmVkVaF9b1qBiIdTapp6aqmfRRtM",
  authDomain: "ymir-8998d.firebaseapp.com",
  databaseURL: "https://ymir-8998d.firebaseio.com",
  projectId: "ymir-8998d",
  storageBucket: "",
  messagingSenderId: "355367264870"
};
firebase.initializeApp(config);

export default firebase.database();
