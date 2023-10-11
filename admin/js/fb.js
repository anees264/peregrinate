var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

firebase.initializeApp(firebaseConfig);

document.getElementById("uploadBtn").addEventListener("click", function () {
    var fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];

    if (file) {
        var storageRef = firebase.storage().ref();
        var imagesRef = storageRef.child("peregrinate/" + file.name);

        var uploadTask = imagesRef.put(file);

        uploadTask.on(
        "state_changed",
        function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
        },
        function (error) {
            console.error("Upload failed: " + error);
        },
        function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("File available at", downloadURL);
            });
        }
        );
    } else {
        console.error("No file selected.");
    }
});
