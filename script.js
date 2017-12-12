//Code for AJAX request and appending images
custom = 'cats';
imagecount = '20';
offset = '0';

function getgifs(){
$('#gifs').empty();
offset = 0;
var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+custom+'&api_key=dc6zaTOxFJmzC&MPAA=R&limit='+imagecount+'&offset='+offset+''
$.ajax({
	    url: queryURL,
	    method: "GET"
    }).done(function(response) {
	    console.log(response);
	    object = response;
		//If no results, show no result screen
		if(response.data.length<1){
			return
		}
		//Append gifs to page
		else {
			//Creates 4 columns to store rows
		    for(var i = 0; i<4; i++){
		    	$('#gifs').append('<div class="col-xs-3" id="col'+i+'"></div>');
		    }
		    //Creates #gif div to append gifs to
		    for (var i = 0; i<response.data.length; i+=4){
		    	var i1=i+1;
		    	var i2=i+2;
		    	var i3=i+3;
		    	$('#col0').append('<div class="container-fluid"><div class="row" id="gif'+i+'"></div></div>');
		    	$('#col1').append('<div class="container-fluid"><div class="row" id="gif'+i1+'"></div></div>');
		    	$('#col2').append('<div class="container-fluid"><div class="row" id="gif'+i2+'"></div></div>');
		    	$('#col3').append('<div class="container-fluid"><div class="row" id="gif'+i3+'"></div></div>');
		    }
		    //Appends gifs to proper #gif div
		    for (var i = 0; i < response.data.length; i++) {
		    	var mystring = response.data[i].title;
		    	var newstring = mystring.replace(/\s/g, "").length;
		    	if(newstring>0){
		    		var temptitle = response.data[i].title
		    	}
		    	else {
		    		var temptitle = 'No Title'
		    	}
		    	$('#gif'+i+'').append('<div class="animatethis gifContainer fadeinout"><a href="'+response.data[i].url+'" target="_blank"><img numvalue="'+i+'" src="'+response.data[i].images.downsized.url+'" data-original="'+response.data[i].images.downsized.url+'" data-still="'+response.data[i].images.downsized_still.url+'"></a></div>');
		    	$('#gif'+i+'').addClass('animated bounceIn');
		    }
		    	
		}
		//End Append gifs to page
	});
}
//End AJAX and gif append

getgifs();

var fadeout = function(){
	var changeImg = $(this).children().eq(0).children().eq(0);
	var stillimage = changeImg.attr('data-still');
	changeImg.attr("src",""+stillimage+"").css('filter', 'brightness(50%)');
}

var fadein = function(){
	var changeImg = $(this).children().eq(0).children().eq(0);
	var originalimage = changeImg.attr('data-original');
	changeImg.attr("src",""+originalimage+"").css('filter', 'brightness(100%)');
}

$(document).on("mouseover", ".fadeinout", fadeout);
$(document).on("mouseout", ".fadeinout", fadein);
