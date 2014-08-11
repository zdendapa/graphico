$(document).on('pageinit', function() {
	$('.flexslider').flexslider({controlNav:false});
});

$(function() {
	var $form = $('#contact'),
		$contact_form = $('.contact-form'),
		user_fields = ['name', 'surname', 'street', 'city', 'zip', 'phone', 'email', 'note', 'poznamka'],
		force_value,
		source,
		user_data = [],
		order_data = [],
		$field,
		field;

	$form
		// Funkce pro vyplnění osobních údajů uživatele
		.on('fill_user_data', function(e, last_submitted) {
			try {
				// Pokud se jedná o poslední odeslanou objednávku, formulář se vyplní natvrdo, jinak jen pokud jsou políčka prázdná
				force_value = (last_submitted);

				// Jestli se použije dočasně vyplněný formulář nebo poslední odeslaná objednávka
				source = (last_submitted ? 'last_submitted_user_data' : 'user_data');

				if (localStorage.getItem(source)) {
					user_data = JSON.parse(localStorage.getItem(source));

					// Projdeme si uložená políčka z localStorage jedno po druhém
					while (field = user_data.pop()) {

						// Najdeme políčko ve formuláři
						$field = $('[name="' + field.name + '"]', $contact_form);

						// Pokud je to zaškrtávací políčko, tak klikneme na <label>
						if ($field.attr('type') === 'checkbox' || $field.attr('type') === 'radio') {
							$field
								.filter('[value="' + field.value + '"]')
								.prev()
								.click();
						}
						// Jinak vyplníme hodnotu
						else {
							if (force_value || $field.val() === '' || ($field.attr('type') === 'email' && $field.val() === '@')) {
								$field
									.val(field.value)
									.trigger('change');
							}
						}
					}
				}
			} catch(e) {
//				console.log(e);
			}
		})

		// Funkce pro vyplnění osobních údajů uživatele se spouští při každém zobrazení stránky
		.trigger('fill_user_data')

		// Funkce pro vyplnění objednávky
		.on('fill_order_data', function(e, last_submitted) {
			try {
				// Pokud se jedná o poslední odeslanou objednávku, formulář se vyplní natvrdo, jinak jen pokud jsou políčka prázdná
				force_value = (last_submitted);

				// Jestli se použije dočasně vyplněný formulář nebo poslední odeslaná objednávka
				source = (last_submitted ? 'last_submitted_order_data' : 'order_data');

				if (localStorage.getItem(source)) {
					order_data = JSON.parse(localStorage.getItem(source));

					// Projdeme si uložená políčka z localStorage jedno po druhém
					while (field = order_data.pop()) {

						// Najdeme políčko ve formuláři
						$field = $('[name="' + field.name + '"]', $form);

						// A vyplníme jeho hodnotu
						if (force_value || $field.val() === '' || ($field.is('select') && $field.val() === '0')) {
							$field
								.val(field.value)
								.trigger('change');
						}
					}
				}
			} catch(e) {
//				console.log(e);
			}
		})
		.validate({
			errorPlacement: function(error, element) {
				error.appendTo(element.closest('td'));
			},
			messages: {
				celkova_cena: "Nemáte vybrané žádné pivo!",
				name: "Prosím, vyplňte své jméno",
				surname: "Prosím, vyplňte své příjmení",
				street: "Prosím, vyplňte svou adresu",
				city: "Prosím, vyplňte své město",
				zip: "Prosím, vyplňte své PSČ",
				phone: "Prosím, vyplňte svoje telefonní číslo",
				email: {
					required: "Prosím, vyplňte svou emailovou adresu",
					email: "Prosím, zadejte platnou emailovou adresu"
				}
			},
			invalidHandler: function(event, validator) {
//				var errors = validator.numberOfInvalids();
//				if (errors) {
//					alert(errors + ' chyb!');
//				}
			},
			submitHandler: function(form) {
				$('.hidden').show();

				$(form).ajaxSubmit({
					beforeSubmit: function(data) {

						// Před odeslání validního formuláře si připravíme data pro uložení do localStorage
						try {
							user_data = data.filter(function(n) {
								return ($.inArray(n.name, user_fields) !== -1)
							});

							order_data = data.filter(function(n) {
								return (n.name.indexOf('count_') === 0 || n.name === 'mixik4');
							});
						} catch(e) {
//							console.log(e);
						}
					},
					error: function(response, status) {
						$('.ui-page').html('<div id="sumarizace"><div class="thanks">Objednávku se nepodařilo odeslat</div></div>');
					},
					success: function(response, status, XHR) {

						// Formulář byl úspěšně odeslaný na preview, uložíme si data do localStorage
						try {
							localStorage.setItem('user_data', JSON.stringify(user_data));
							localStorage.setItem('order_data', JSON.stringify(order_data));
						} catch(e) {
//							console.log(e);
						}
					},
					target: '.ui-page'
				});
			}
		});

	// Při kliknutí na „Načíst poslední objednávku“ se formulář vyplní
	$('#go_latest')
		.on('click', function() {
			$form
				.trigger('fill_user_data', [true])
				.trigger('fill_order_data', [true]);

			return false;
		});

	// Pokud žádná objednávka v localStorage není uložena, button se skryje
	try {
		if ( ! localStorage.getItem('last_submitted_order_data')) {
			$('#go_latest')
				.closest('.ui-btn')
				.hide();
		}
	}
	catch(e) {
//		console.log(e);
	}

	// Při každém načtení stránky se kontroluje, jestli máme načíst z localStorage údaje o objednávce
	if (parseInt(sessionStorage.getItem('load_order'), 10) > 0) {
		// Pokud ano, tak tohle nastavení změníme, objednávka se načítá pouze jednou (na vyžádání, viz. „Upravit objednávku“ v preview)
		sessionStorage.setItem('load_order', 0);

		$form
			.trigger('fill_order_data');
	}
});
