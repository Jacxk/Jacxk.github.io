var firebaseConfig = {
    apiKey: "AIzaSyDi5vXyW1HOuRraJuLkLJa7bBbRz3CRI08",
    authDomain: "jackscode-da35e.firebaseapp.com",
    databaseURL: "https://jackscode-da35e.firebaseio.com",
    projectId: "jackscode-da35e",
    storageBucket: "jackscode-da35e.appspot.com",
    messagingSenderId: "207065973849",
    appId: "1:207065973849:web:795ff8dd5339f661"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const $alert = $(".alert").hide();

$('.form').on('submit', function (e) {
    const data = $(this).serializeArray();

    db.collection("suggestions").add({
        [data[0].name]: data[0].value,
        [data[1].name]: data[1].value,
        [data[2].name]: data[2].value,
        [data[3].name]: data[3].value
    }).then(function (docRef) {
        $alert.css('background-color', "#8BC34A")
            .text("Suggestion submitted!")
            .toggle("slide")
            .delay(5000)
            .toggle("slide");
        console.log("Document written with ID: ", docRef.id);
    }).catch(function (error) {
        $alert.css('background-color', "#E53935")
            .text("Something went wrong!")
            .toggle("slide")
            .delay(5000)
            .toggle("slide");
        console.error("Error adding document: ", error);
    });

    e.preventDefault();
    $(this).find("input, textarea").val("");
});

db.collection("suggestions").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        $('.suggestions').append(`
        <div class="suggestion-card">
            <div class="suggestion-body">
                <h2 class="suggestion-name"><a href="${data['link']}" target="_blank">${data['package-name']}</a></h2>
                <p class="suggestion-reason">${data['reason']}</p>
                <div class="suggestion-footer">
                    <span class="suggestion-time">${$.timeago(doc._document.proto.createTime)}</span>
                    <span class="suggestion-user">${data['username']}</span>
                </div>
            </div>
        </div>
        `);
    });
});