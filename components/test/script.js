// file: script.js
// Initialize Firebase
var config = {
  apiKey: "AIzaSyA_UKr9E3trZA323r4LvsfsH3lnpNCYtC8",
  authDomain: "lkiea-f3e19.firebaseapp.com",
  projectId: "lkiea-f3e19",
  databaseURL: "https://lkiea-f3e19-default-rtdb.firebaseio.com/",
  messagingSenderId: "67930827677",
  appId: "1:67930827677:web:15fafd962274021bd15d74"
};
firebase.initializeApp(config);

//create firebase database reference
var dbRef = firebase.database();
var contactsRef = dbRef.ref('contacts');

//load older conatcts as well as any newly added one...
contactsRef.on("child_added", function(snap) {
  console.log("added", snap.key, snap.val());
  $('#contacts').append(contactHtmlFromObject(snap.val()));
});

//save contact
$('.addValue').on("click", function( event ) {  
    event.preventDefault();
    if( $('#name').val() != '' || $('#email').val() != '' ){
      contactsRef.push({
        name: $('#name').val().replace(/<[^>]*>/ig, ""),
        email: $('#email').val().replace(/<[^>]*>/ig, ""),
        location: {
          city: $('#city').val().replace(/<[^>]*>/ig, ""),
          state: $('#state').val().replace(/<[^>]*>/ig, ""),
          zip: $('#zip').val().replace(/<[^>]*>/ig, "")
        }
      })
      contactForm.reset();
    } else {
      alert('Please fill atlease name or email!');
    }
  });

//prepare conatct object's HTML
function contactHtmlFromObject(contact){
  console.log( contact );
  var html = '';
  // html += '<li class="list-group-item contact">';
  //   html += '<div>';
  //     html += '<p class="lead">'+contact.name+'</p>';
  //     html += '<p>'+contact.email+'</p>';
  //     html += '<p><small title="'+contact.location.zip+'">'+contact.location.city+', '+contact.location.state+'</small></p>';
  //   html += '</div>';
  // html += '</li>';
  html +=  '<section class="section-50">';
		html +=  '<div class="container">';
		html += 	'<div class="notification-ui_dd-content">';
    html += 	'<div class="notification-list">';
    html += 	'<div class="notification-list_content">';
    html += 	'<div class="notification-list_img">';
    html += 	'<img src="images/users/user3.jpg" alt="user">';
    html += 	'</div>';
    html += 	'<div class="notification-list_detail">';
    html += 	'<p><b>'+contact.name+'</b> reacted to your post</p>';
    html += 	'<p class="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.</p>';
    html += 	'<p class="text-muted"><small>10 mins ago</small></p>';
    html += 	'</div>';
    html += 	'</div>';
    html += '<div class="notification-list_feature-img">';
    html += 	'<img src="https://res.cloudinary.com/dgly8b9lq/image/upload/v1642155403/Lkia/man_1_ilhh9d.png" alt="Feature image">';
    html += 	'</div>';
    html += 	'</div>';
		html += 	'</div>';
    html += 	'</div>';
    html += '</section>';
  return html;
}