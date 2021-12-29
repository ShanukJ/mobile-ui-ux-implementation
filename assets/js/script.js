$(document).ready(function() {
	$("#category").hover(function() {
		$(this).css("color", "black");
	}, 
	function() {
		$(this).hide();
		//$(this).css("display", "none");
	});

	$("#header").click(function(){
		alert("Logo Header Clicked")
    //$(".logo_header").hide();
  });

	$("#home").click(function(){
		//alert("Icon Header Clicked")
    //$(".logo_header").hide();
		$( '#home_icon' ).removeClass( 'material-icons-outlined' );
		$( '#home_icon' ).addClass( 'material-icons' );
		//console.log(this)
		alert(this.id);
  });
	
});