'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

var candidate_card_number = 0;
var new_card;
var new_card_panel;
var card_html;
var time_interval;

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	var minThresh = 10;

	$("#yes").click(function() {
		full_right();
	});


	$("#no").click(function() {
		full_left();
	});

  	$("#card_container").swipe( {
        swipeStatus:function(event, phase, direction, distance, duration, fingers)
        {
          if(distance < 100) {
          	if(direction=="left") {
				partial_left();
          	}
          	else if(direction=="right") {
				partial_right();
          	}
          	else if(direction=="down"){
          		partial_down();

          	}
          	if(phase=="end") {
          		reset_card();
          	}
          }
          else {
          	if(direction=="left") {
          		$("#card_container .top-card .card").addClass("animate-dislike ng-leave ng-leave-active");
          		if (phase == "end") full_left();
          	}
          	else if(direction=="right") {
				full_right();
          	} 
          	else if(direction=="down"){
          		$("#card_container .card").addClass("animate-later ng-leave ng-leave-active");
          		if (phase == "end") full_down();
          	}
          }
        },
        threshold: minThresh
      });

  	//initalizes the first candidate card
  	initialize_first_card();
}


/*initializes the first card to be visible*/
function initialize_first_card() {
	candidate_card_number =	$(".panel").first().attr('class').match(/\d+/);;
	new_card = $(".card-"+candidate_card_number);
	new_card.removeClass("bottom-card");
	new_card.addClass("top-card");


	new_card_panel = $(".card-panel-"+candidate_card_number);
	new_card.css("display","block");
	new_card_panel.css("display", "block");


	//show bottom card
	var sibling_card = new_card.next();
	var next_card_number = sibling_card.attr('class').match(/\d+/);
	var next_card = $(".card-"+next_card_number);
	next_card.css("display","block");


}

function reset_card() {
	// TODO, animate this
	$("#card_container .card").removeClass("animate-partial animate-dislike-partial animate-like-partial");
}

function partial_right() {
	$("#card_container .card").removeClass("animate-partial animate-dislike-partial");
	$("#card_container .card").addClass("animate-partial animate-like-partial");
}

function partial_left() {z
	$("#card_container .top-card .card").removeClass("animate-partial animate-like-partial");
	$("#card_container .top-card .card").addClass("animate-partial animate-dislike-partial");
}

//TODO fix this
function partial_down() {
	$("#card_container .card").removeClass("animate-partial animate-like-partial animate-dislike-partial");
	$("#card_container .card").addClass("animate-partial animate-later-partial");
}

/*clears current card, generates new card*/
function full_left() {
	time_interval = setInterval(loadNewCard, 100);
}


/*brings up message modal, new card*/
function full_right() {
	$("#card_container .card").addClass("animate-like ng-leave ng-leave-active");
	time_interval = setInterval(showModal, 100);
	// TODO, load next card
}

/*generates new card, increments to later list*/
function full_down() {
	// console.log("goin down");
	time_interval = setInterval(loadNewCard, 100);
}


function showModal() {
	$("#modal").show();
	var height = $(window).height();
	$("#modal").css({"height":height});
	attachModalListeners();
	clearInterval(time_interval);
}

function loadNewCard() {
	// console.log("loaded");
	//TODO: later do ajax request from server => returns next card set's html
	//TODO: two options: display inline rather than visible. OR put this id delete last one
	// new_card.css("visibility", "hidden");
	// new_card_panel.css("visibility", "hidden");
	var sibling_card = new_card.next();
	// console.log(sibling_card);

	new_card.css("display","none");
	new_card_panel.css("display", "none");

	candidate_card_number = sibling_card.attr('class').match(/\d+/);
	new_card = $(".card-"+candidate_card_number);
	new_card.removeClass("bottom-card");		//new card becomes top card
	new_card.addClass("top-card");

	new_card_panel = $(".card-panel-"+candidate_card_number);
	new_card.removeClass('*[class^="animate-"]');
	// new_card_panel.removeClass('*[class^="animate-"]'); 	TODO get this regext to work
	new_card_panel.removeClass("animate-partial");
	new_card_panel.removeClass("animate-dislike animate-dislike-partial");
	new_card_panel.removeClass("animate-like animate-like-partial");
	new_card_panel.removeClass("animate-later animate-later-partial");
	new_card.css("display","block");
	new_card_panel.css("display", "block");

	 sibling_card = new_card.next();
	var next_card_number = sibling_card.attr('class').match(/\d+/);
	var next_card = $(".card-"+next_card_number);
	next_card.css("display","block");

	clearInterval(time_interval);
}



function attachModalListeners() {
	$("#modal").click(function() {
		$("#modal").hide();
	});
	$('.modal_inner').click(function(event){
    	event.stopPropagation();
	});
	$(".modal_inner .back").click(function() {
		$("#modal").hide();
	});
	$(".modal_inner #back").click(function() {
		$("#modal").hide();
	});
}