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
var product_page_data;
//create firebase database reference
var dbRef = firebase.database();
var contactsRef = dbRef.ref('contacts');
var productsRef = dbRef.ref('products');
var share = "No items in favourite list"
var today  = new Date();
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var stars =0;
var remove_key;
//load older conatcts as well as any newly added one...
contactsRef.on("child_added", function(snap) {
  console.log("added", snap.key, snap.val());
  $('#contacts').append(contactHtmlFromObject(snap.val()));
});
let arr =[];
let sendThis="";
productsRef.on("child_added", function(snap) {
  $('#display_fav').append(productHtmlFromObject(snap.val(),snap.key));
  arr.push(snap.val());
  console.log("arrarr",arr);
});

// database.ref("products").on("child_added", function (data) {
//   add_data_table(
//     data.val().username,
//     data.val().profile_picture,
//     data.val().email,
//     data.key
//   );
//   var lastkey = data.key;
//   nextkey = parseInt(lastkey) + 1;
// });
// database.ref("products").on("child_changed", function (data) {
//   update_data_table(
//     data.val().username,
//     data.val().profile_picture,
//     data.val().email,
//     data.key
//   );
// });
productsRef.on("child_removed", function (data) {
  remove_data_table(data.key);
});

$('.stars a').on('click', function(){
  $('.stars span, .stars a').removeClass('active');
  let st = $(this).attr("id");
  console.log("stars+   " + st)
switch (st) {
  case "st-1":
    stars = 1;
    break;
  case "st-2":
    stars = 2;
    break;
  case "st-3":
    stars = 3;
    break;
  case "st-4":
    stars = 4;
    break;
  case "st-5":
    stars = 5;
    break;
  default:
    stars = 0;
    break;
}
  $(this).addClass('active');
  $('.stars span').addClass('active');
  console.log("stars+" + stars)
});

//save contact
$('.addValue').on("click", function( event ) { 
  //  $('#popupLogin').addClass('hidden');
    event.preventDefault();
    if( $('#name').val() != '' || $('#email').val() != '' ){
      contactsRef.push({
        name: $('#name').val().replace(/<[^>]*>/ig, ""),
        email: $('#email').val().replace(/<[^>]*>/ig, ""),
        date: today.toLocaleDateString("en-US", options),
        star : stars
        // description: "Lighting makes the room. Strategically placed, lamps can bring any room into a deeper perspective and showcase your compelling decor. This guide will introduce you to many types of lamp shades available from The Home Depot that will address your lighting needs while enhancing your decor.",
        // main_img: "https://res.cloudinary.com/dgly8b9lq/image/upload/v1642139960/Lkia/joel-henry-pdIwPL3HU2s-unsplash_jtp9rn.jpg",
        // main_title: "Tripod Table Lamp - Modern Bedside Lamp for Room Lighting",
        // price: "£ 39.80",
        // stars: 5
      })
      contactForm.reset();
      $('.stars span, .stars a').removeClass('active');
      stars = 0;
    } else {
      alert('Please fill atlease name!');
    }
  });

//prepare conatct object's HTML
function contactHtmlFromObject(contact){
console.log(JSON.stringify(contact)+"Jaye");
  let count = contact.star;

  var star = '';

  for (let i = 0; i < 5; i++) {
    if(count != 'undefined'){
      if(count > 0){
        star +=  '<span class="active">';
    star +=  '<a id="readonly_rating">1</a>';
    star +='</span>';
    count--;
      } else{
        star +=  '<span class="read-only">';
        star +=  '<a id="readonly_rating">1</a>';
        star +='</span>';
      }
  }}

  var html = '';
  html +=  '<section class="section-50">';
		html +=  '<div class="container">';
		html += 	'<div class="notification-ui_dd-content">';
    html += 	'<div class="notification-list">';
    html += 	'<div class="notification-list_content">';
    html += 	'<div class="notification-list_img">';
    html += 	'<img src="https://res.cloudinary.com/dgly8b9lq/image/upload/v1642155403/Lkia/man_1_ilhh9d.png" alt="Feature image" alt="user">';
    html += 	'</div>';
    html += 	'<div class="notification-list_detail">';
    html += 	'<p><b>'+contact.name+'</b></p>';
    html += 	'<p class="text-muted">'+contact.email+'</p>';
    html += 	'<p class="text-muted"><p class="stars-read-only">';
    html += '<span class="read-only">'
    html += star;
    html +='</span>'
    html +='</p></p>';
    html += 	'<p class="text-muted"><small>'+contact.date+'</small></p>';
    html += 	'</div>';
    html += 	'</div>';
    html += '<div class="notification-list_feature-img">';
    html += 	'<img src="https://res.cloudinary.com/dgly8b9lq/image/upload/v1642139960/Lkia/joel-henry-pdIwPL3HU2s-unsplash_jtp9rn.jpg">';
    html += 	'</div>';
    html += 	'</div>';
		html += 	'</div>';
    html += 	'</div>';
    html += '</section>';
  return html;
}

function productHtmlFromObject(product,key){
  
  console.log(JSON.stringify(product)+"prod",key);
  remove_key=key;
  var str = product.main_title;
  if(str.length > 10) str = str.substring(0,19);
    var prd = '';
    prd += '<div id="id " class="prod-grid1">';
    prd += ' <a href="#new_product_page">';
    prd += ' <div class="card_elements" id="redirect-product">';
    prd += ' <div class="card-image">';
    prd +=
      ' <img alt="home"src="'+product.main_img+'"class="image_card"/>';
    prd += " </div>";
    prd += ' <h5 class="card-product-title"> &nbsp;' + str;
    prd += ' <h6 class="card-product-desc"> &nbsp;' + product.price;
    prd += " </h6>";
    prd += '<a href="#" class="card-product-desc-remove" data-key="'+key+'style="position: relative; left: 10px;" >Remove From Favourite</a>'
    prd += " </div>";
    prd += " </a>";
    prd += "</div>";
    return prd;
  }
  
  function add_data_table(id) {
    productsRef.push({ main_img: "https://res.cloudinary.com/dgly8b9lq/image/upload/v1642139960/Lkia/joel-henry-pdIwPL3HU2s-unsplash_jtp9rn.jpg",
        main_title: "Tripod Table Lamp - Modern Bedside Lamp for Room Lighting",
        price: "£ 39.80",
        stars: 5})
  }
  $(document).on("click", "#t2", function (event) {
    var x = document.getElementById("snackbar-fav-rem");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  });
  function remove_data_table(key) {
    console.log("awa1",key)
    dbRef.ref("products/" + remove_key).remove();
  }
  
  
  function sendEmail(mail) {
    sendThis+="\n === FAVOURITE LIST === \n";
    for (let i = 0; i < arr.length; i++) {
      sendThis+="\nItem Title - "+arr[i].main_title+"\n";
      sendThis+="Item Price - "+arr[i].price+"\n";
    }
    
    Email.send({
    Host: "smtp.gmail.com",
    Username : "lkialk2022@gmail.com",
    Password : "This@1234",
    To : mail,
    From : "lkialk2022@gmail.com",
    Subject : "Favourite List",
    Body : sendThis,
    Attachments : [
      {
        name : "lkia.png",
        path:"https://res.cloudinary.com/dgly8b9lq/image/upload/v1640846394/Lkia/main_p0wjoy.png"
      }]
    }).then(
      console.log()
    );
  }

  var answersRef = dbRef.ref('answers');

var today  = new Date();
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

//load older conatcts as well as any newly added one...
answersRef.on("child_added", function(snap) {
  console.log("added", snap.key, snap.val());
  $('#answers').append(answerHtmlFromObject(snap.val()));
});

//save contact
$('.addReply').on("click", function( event ) { 
  //  $('#popupLogin').addClass('hidden');
    event.preventDefault();
    if( $('#name_ans_user').val() != '' || $('#user_answer').val() != '' ){
      answersRef.push({
        name: $('#name_ans_user').val().replace(/<[^>]*>/ig, ""),
        email: $('#user_answer').val().replace(/<[^>]*>/ig, ""),
        date: today.toLocaleDateString("en-US", options)
      })
      contactForm.reset();
    } else {
      alert('Please fill atlease name nn!');
    }
  });

//prepare conatct object's HTML
function answerHtmlFromObject(reply){
  console.log('Jaye' +reply );
  var html = '';
  html +=  '<section class="section-50">';
		html +=  '<div class="container">';
		html += 	'<div class="notification-ui_dd-content">';
    html += 	'<div class="notification-list">';
    html += 	'<div class="notification-list_content">';
    html += 	'<div class="notification-list_img">';
    html += 	'<img src="https://res.cloudinary.com/dgly8b9lq/image/upload/v1642155403/Lkia/man_1_ilhh9d.png" alt="Feature image" alt="user">';
    html += 	'</div>';
    html += 	'<div class="notification-list_detail">';
    html += 	'<p><b>'+reply.name+'</b> Replied to <b>Stefani</b>,</p>';
    html += 	'<p class="text-muted">'+reply.email+'</p>';
    html += 	'<p class="text-muted"><small>'+reply.date+'</small></p>';
    html += 	'</div>';
    html += 	'</div>';
    html += 	'</div>';
		html += 	'</div>';
    html += 	'</div>';
    html += '</section>';
  return html;
}

// Questions

var questionRef = dbRef.ref('question');

var today  = new Date();
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

//load older conatcts as well as any newly added one...
questionRef.on("child_added", function(snap) {
  console.log("added", snap.key, snap.val());
  $('#questions').append(questionHtmlFromObject(snap.val()));
});

//save contact
$('.addQuestion').on("click", function( event ) { 
  //  $('#popupLogin').addClass('hidden');
    event.preventDefault();
    if( $('#name_qc_user').val() != '' || $('#user_question').val() != '' ){
      questionRef.push({
        name: $('#name_qc_user').val().replace(/<[^>]*>/ig, ""),
        email: $('#user_question').val().replace(/<[^>]*>/ig, ""),
        date: today.toLocaleDateString("en-US", options)
      })
      contactForm.reset();
      popupLogin.popup('close');
    } else {
      alert('Please fill atlease name!');
    }
  });

//prepare conatct object's HTML
function questionHtmlFromObject(question){
  console.log('Jaye' +question );
  var html = '';
  html +=  '<section class="section-50">';
		html +=  '<div class="container">';
		html += 	'<div class="notification-ui_dd-content">';
    html += 	'<div class="notification-list">';
    html += 	'<div class="notification-list_content">';
    html += 	'<div class="notification-list_img">';
    html += 	'<img src="https://res.cloudinary.com/dgly8b9lq/image/upload/v1642155403/Lkia/man_1_ilhh9d.png" alt="Feature image" alt="user">';
    html += 	'</div>';
    html += 	'<div class="notification-list_detail">';
    html += 	'<p><b>'+question.name+'</b> asked a question</p>';
    html += 	'<p class="text-muted">'+question.email+'</p>';
    html += 	'<p class="text-muted"><small>'+question.date+'</small></p>';
    html += 	'</div>';
    html += 	'</div>';
    html += 	'</div>';
		html += 	'</div>';
    html += 	'</div>';
    html += '</section>';
  return html;
}
