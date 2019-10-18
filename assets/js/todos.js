// 0. Generate initial to-do list
todolist = ['Eat','Sleep','Rave','Repeat']; 
lentodo = todolist.length;
HTML = "<ul>";
for (i=0;i<lentodo;i++) {
    HTML += '<li><span class="pencil"><i class="fa fa-pencil"></i></span><span class="trash"><i class="fa fa-trash"></i></span> '+todolist[i]+'</li>';
} 
HTML += "</ul>";
$('div#TodoListing').html(HTML);

// 1. Check off specific tasks by clicking
// Update: Specify on parent 'ul' to take into account new child elements 'li'
$('ul').on('click','li',function(){
    $(this).toggleClass("done");
});

// 2. Remove specific task by clicking
// Update: Specify on parent 'ul' to take into account new child elements 'span'
$('ul').on('click','span.trash',function(event){
    event.stopPropagation(); //Stop other events connected with span like 1. above
    //$('audio#papersound')[0].play();  // play throwing paper away sound
    $(this).parent().fadeOut(500,function(){
        $(this).remove;
    }); //Remove parent HTML element (li) as a whole, use fadeOut
});

// 3. Event listener when input field is filled in and <enter> is hit
$('input[type="text"]').on('keypress',function(e) {
    if (e.which === 13) {
        // grabbing inserted field and store as new variable
        var todoText = $(this).val();
        // Empty text input element
        $(this).val("");
        // create new <li> element with <span> and append to <ul>
        $('ul').append("<li><span class='pencil'><i class='fa fa-pencil'></i></span><span class='trash'><i class='fa fa-trash'></i></span> "+todoText+"</li>");
    }
})

// 4. Fade out input when clicking on plus sign
$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
})

// 5. Extra challenge: Edit specific task by clicking on pencil symbol
$('ul').on('click','span.pencil',function(event){
    event.stopPropagation(); //Stop other events connected with span like 1. above
    // Select parent <li> element, get its text and remove spaces from it
    var getTodo = $(this).parent().text().replace(/\s+/, "");
    // Replace text with an input field incl. placeholder
    $(this).parent().replaceWith("<input id='newTodo' type='text' placeholder='"+getTodo+"'>");
    
    // Apply focus() on new input field for css styling
    //$('input#newTodo').focus().on('keypress',function(e) { // NOT WORKING FOR <ESCAPE>!
    $('input#newTodo').focus().keyup(function(e) {  
        //<Enter>
        if (e.which === 13) {
            var newTodoText = $(this).val();
            $(this).replaceWith("<li><span class='pencil'><i class='fa fa-pencil'></i></span><span class='trash'><i class='fa fa-trash'></i></span> "+newTodoText+"</li>");
        }
        //<Escape>
        if (e.which === 27) {
            $(this).replaceWith("<li><span class='pencil'><i class='fa fa-pencil'></i></span><span class='trash'><i class='fa fa-trash'></i></span> "+getTodo+"</li>");
        }
    });
});
