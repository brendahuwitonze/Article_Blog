         // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyC3_cAKGOnuFOHuYNUikh7TH2HUst_09jI",
        authDomain: "article-blog-93940.firebaseapp.com",
        databaseURL: "https://article-blog-93940.firebaseio.com",
        projectId: "article-blog-93940",
        storageBucket: "article-blog-93940.appspot.com",
        messagingSenderId: "331886057065",
        appId: "1:331886057065:web:1f5457a3be95e587e7f4f8",
        measurementId: "G-GNQ6GR0LCQ"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    var author, bio, title, detail;


    document.getElementById('button').onclick = function () {
        title = document.getElementById('title').value;
        author = document.getElementById('author').value;
        bio = document.getElementById('bio').value;
        detail = document.getElementById('detail').value;

        var image = document.getElementById("image").files[0];
        var imageName = image.name;
        var storageRef = firebase.storage().ref("images/" + imageName);
        var uploadTask = storageRef.put(image);

        uploadTask.on("state_changed", function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("uploaded" + progress + "done")
        },
            function (error) {
                console.log(error.message);

            },

            function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (url) {

                    console.log(url);
                    

                    firebase.database().ref('Table/' + title).set({
                        Title: title,
                        Author: author,
                        Bio: bio,
                        Detail:detail,
                        Url: url
                    });
                    
                }

                );
            });



    
    }
   
    var database = firebase.database();
    database.ref('Table/').on('value', function (snapshot) {
        snapshot.forEach(function (data) {
            var titl = data.val().Title;
            var aut = data.val().Author;
            var detai = data.val().Detail;
            var bi = data.val().Bio;
            console.log(titl);
            console.log(aut);
            console.log(bi);
            console.log(data.val().Url);


           
            $("div.posts").append("<div class='card col-lg-3 m-3'><img  src='" + data.val().Url + "' class='card-img-top i' alt='...'><div class='card-body'><h5 class='card-title'>" + titl + "</h5><p class='card-text'>" + bi +"</p><p class='text-small text-muted text-left'>Author: <span>" + aut +"  </span></p><a href='#datails' class='btn colorbtn text-white' style='background-color: #ffb3b3;'>VIEW</a></div></div>");
           
            $(".colorbtn").last().click(function () {
                $('#details').show();
                $('#homepage').hide();
                $("#formpage").hide();
                $("#details #story-title").text(titl);
                $("#details .bio").text(bi);
                $("#details .detail").text(detai);
                $("#details #imagejumb").attr('src', data.val().Url);
                $("#details .author").text(aut);

            });
        });
    });

    $('#create').click(function() {
        $('#formpage').show();
        $("#homepage").hide();
        $('#details').hide();
        

    });
    $('#button').click(function() {
        $('#homepage').show();
        $("#formpage").hide();
        $('#details').hide();

    });
    $('#homep').click(function() {
        $('#homepage').show();
        $("#formpage").hide();
        $('#details').hide();
    });
  
