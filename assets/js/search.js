$(function () {
	$(document).on('click', 'a[href="#search"]', function (event) {
		$('#search').addClass('open');
		$('#search > form > input[type="search"]').focus();
	});
	$(document).on('click keyup', '#search, #search button.close', function (event) {
		if (event.target === this || event.target.className === 'close' || event.keyCode === 27) {
			$(this).removeClass('open');
		}
	});
});