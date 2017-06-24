function next(){
	if(imageSequence < images.length){
		imageSequence += 1
	}else{
		imageSequence = 1;
	}
	$.each(images,function(index,image){
		if(index == imageSequence-1){
			images[index].fadeIn(800);
		}else{
			images[index].fadeOut(800);
		}
	});
}

function prev(){
	if(imageSequence > 1){
		imageSequence -= 1
	}else{
		imageSequence = images.length;
	}
	$.each(images,function(index,image){
		if(index == imageSequence-1){
			images[index].fadeIn(800);
		}else{
			images[index].fadeOut(800);
		}
	});
}
function showAndStopAtImage(num){
	clearInterval(timer);
	console.log("cleared timer"+num);
	$.each(images,function(index,image){
		if(index+1 == num){
			imageSequence = num;
			images[index].fadeIn(800);
			console.log("fadein");
		}else{
			images[index].fadeOut(800);
		}
	});
}

function resumeSliding(){
	console.log("resumeSliding");
	timer = setInterval(function(){
			next();
	},2500);
}

var imageSequence = 1;//one-based indexing
var images = [];
var timer;
$(document).ready(function(){
	//creating an array of images
	for(i=1;i<4;i++){
		images.push($('#image'+i));
	}
	// creator button navigator
	for(i=0;i<images.length;i++){
		$('#img-navigator').append('<div id=img-button'+(i+1)+'></div>');
		$('#img-button'+(i+1)).css({
			'position':'absolute',
			'border-radius':'50%',
			'background-color':'grey',
			'height':'16px',
			'width':'16px',
			'left': 16*i+3*(i+1) +'px',
			'top':'0',
			'padding':'0'
		});
	}
	
	$('#img-navigator').css({
		'position':'absolute',
		'bottom':'35px',
		'width': (images.length+1)*3 +(images.length)*16 +'px',
		'left': 0.5*(parseFloat($("#carousel-body").css('width'))-parseFloat($('#img-navigator').css('width')))+'px'
	});
	//the similar code above does not work as width was not defined properly yet
	$('#img-navigator').css('left',0.5*(parseFloat($("#carousel-body").css('width'))-parseFloat($('#img-navigator').css('width')))+'px');

	//click on img nav button
	for(i=1;i<images.length+1;i++){
		console.log(i);
		$('#img-button'+i).on('mouseenter',{firstData: i},function(e){
			$(e.target).css({
				'border-width':'3px',
				'border-color':'red',
				'border-style':'solid'
			});
			showAndStopAtImage(e.data.firstData);
		});
		$('#img-button'+i).on('mouseleave',function(e){
			$(e.target).css({
				'border-width':'0',
				'border-color':'red',
				'border-style':'solid'
			});
			resumeSliding();
		});
	}


	timer = setInterval(function(){
		next();
	},2500);
	//left right arrows click event listener
	$('#right-arrow').on('click',function(e){
		clearInterval(timer);
		next();
	
		timer = setInterval(function(){
			next();
		},2500);

	});
	$('#left-arrow').on('click',function(e){
		clearInterval(timer);
		prev();
		timer = setInterval(function(){
			next();
		},2500);
	});

	//hover over left or right arrow
	$('#left-arrow').on('mouseenter',function(){
		$('#left-arrow').css({
			'border-width': '3px'
		});
	});
	$('#left-arrow').on('mouseleave',function(){
		$('#left-arrow').css({
			'border-width': '1px'
		});
	});
	$('#right-arrow').on('mouseenter',function(){
		$('#right-arrow').css({
			'border-width': '3px'
		});
	});
	$('#right-arrow').on('mouseleave',function(){
		$('#right-arrow').css({
			'border-width': '1px'
		});
	});
});