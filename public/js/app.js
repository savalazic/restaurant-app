$(window).load(function() {

	var $grid = $('.grid');

	$grid.isotope({
		layoutMode: 'packery',
		itemSelector: '.item',
		packery: {
			gutter: 30
		}
	});

  $('.card').each(function(i){
    setTimeout(function(){
      $('.card').eq(i).addClass('is-visible');
    }, 100 * i);
  });

});

