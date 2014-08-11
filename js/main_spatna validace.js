$(document).on('pageinit', function() {
	$('.flexslider').flexslider({controlNav:false});

	$('#submit').on('click', function() {
		var error = 0;
		var $contactpage = $(this).closest('.ui-page');
		var $contactform = $(this).closest('.contact-form');
		$('.required', $contactform).each(function(i) {
			if($(this).val() === '') {
				error++;
			}
		});
		// each
		if (error > 0) {
			alert('Please fill in all the mandatory fields. Mandatory fields are marked with an asterisk *.');

			return false;
		}
	});
});

$(function() {
	$('#contact').submit(function() {
		$('.hidden').show();
		$("#contact").validate();
		$(this).ajaxSubmit({
			error: function(response, status) {
				$('.ui-page').html('<div id="sumarizace"><div class="thanks">Objednávku se nepodařilo odeslat</div></div>');
			},
			success: function(response, status, XHR) {
			},
			target: '.ui-page'
		});

		return false;
	});
});
