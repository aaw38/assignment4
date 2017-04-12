// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
	$(".flexsearch-input").keyup(function() {
		var prefix = "^" + $(this).val().toLowerCase();

		//make a query for the interests/programing terms (included in data=all)
		$.ajax({
			type: 'GET',
			url: 'http://www.mattbowytz.com/simple_api.json?data=all',
			dataType: 'json',
			success: function (data) {
				$.each(data.data, function(key1, value) {
					$.each(value, function(key2, searchTerm) {
						if (searchTerm.toLowerCase().match(prefix) && prefix != "^") {
							if (!$("#result-" + key1 + "-" + key2).length) //if this element doesn't already exist, make it	    	
								$("<a class='result' id='result-" + key1 + "-" + key2 + "' href='https://www.google.com/#q=" + searchTerm.replace(/ /g, "+") + "' target='_blank'>").html(searchTerm).insertAfter($(".flexsearch-input")).hide().slideDown("slow");
						}
						else {
							$("#result-" + key1 + "-" + key2).remove(); //remove this element if it isn't valid anymore
						}   		      
					});
				});
			}
		});

		//make a query for the comics (these aren't included in data=all, query separately)
		$.ajax({
			type: 'GET',
			url: 'http://www.mattbowytz.com/simple_api.json?data=comics',
			dataType: 'json',
			success: function (data) {
				$.each(data.data, function(key, searchTerm) {
					if (searchTerm.toLowerCase().match(prefix) && prefix != "^") {
						if (!$("#result-c-" + key).length)		    	
							$("<a class='result' id='result-c-" + key + "' href='https://www.google.com/#q=" + searchTerm.replace(/ /g, "+") + "' target='_blank'>").html(searchTerm).insertAfter($(".flexsearch-input")).hide().slideDown("slow");
					}
					else {
						$("#result-c-" + key).remove();
					}   		      
				});
			}
		});
	});
})();