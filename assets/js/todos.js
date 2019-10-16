// 1. Check off specific tasks by clicking
$('li').on('click',function(){
    $(this).toggleClass("done");
});

// 2. Remove specific task by clicking
$('span').on('click',function(event){
    event.stopPropagation(); //Stop other events connected with span like 1. above
    $('audio#papersound')[0].play();  // play throwing paper away sound
    $(this).parent().fadeOut(500,function(){
        $(this).remove;
    }); //Remove parent HTML element (li) as a whole, use fadeOut
});