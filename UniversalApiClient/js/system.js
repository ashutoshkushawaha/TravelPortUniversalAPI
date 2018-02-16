jQuery(document).ready(function($){

    $('body').on('click', function() {
        $('.user .btn').removeClass('active');
        $('.user .dropdown').removeClass('active');
        $('.popup_opt').removeClass('active');
    });

    $('.user .btn').on('click', function(e) {
	    e.stopPropagation();
        $('.user .btn').addClass('active');
        $('.user .dropdown').addClass('active');
        $('.popup_opt').removeClass('active');
    });
    
    $('.btn_opt, .popup_opt').on('click', function(e) {
	    e.stopPropagation();
        $('.popup_opt').addClass('active');
        $('.user .btn').removeClass('active');
        $('.user .dropdown').removeClass('active');
    });
    
    // Select2 Dropdown
    $('.airport-search').select2({
        width: '100%'
    });
    
    // Date picker
    $('[data-toggle="datepicker"]').datepicker();
    
    $('.add_adult').click(function () {
            $(this).prev().val(+$(this).prev().val() + 1);
        });
    $('.sub_adult').click(function () {
        if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
    });
    $('.add_child').click(function () {
            $(this).prev().val(+$(this).prev().val() + 1);
        });
    $('.sub_child').click(function () {
        if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val() - 1);
    });
    $('.add_infant').click(function () {
            $(this).prev().val(+$(this).prev().val() + 1);
        });
    $('.sub_infant').click(function () {
        if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val() - 1);
    });

});