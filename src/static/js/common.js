$(function () {

	var acc = document.getElementsByClassName("lm_accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	}

	$('.work_nav_item').each(function () {
		$(this).click(function () {
			$('.work_nav_item').each(function () {
				if ($(this).hasClass('work_nav_item_active')) $(this).removeClass('work_nav_item_active');
			})
			$(this).addClass('work_nav_item_active');
			var sswitch = $(this).data('worknav');
			$('.work_items .work_item').each(function () {
				if ($(this).data('navswitch') === sswitch) $(this).removeClass('hidden');
				else $(this).addClass('hidden');
			})
		})
	})

	// sllider

	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 3,
		spaceBetween: 50,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			// when window width is <= 480px
			700: {
				slidesPerView: 1,
				spaceBetween: 20
			},
			// when window width is <= 640px
			1000: {
				slidesPerView: 2,
				spaceBetween: 30
			}
		}
	});

});