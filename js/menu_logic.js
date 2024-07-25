$(document).ready(() => {
    // hide elements
    $('#description-container').hide()
    $('#submission-form-container').hide();
    $('#sensors-container').hide();


    // menu logic
    $('#menu-advantages').click(() => {
        $('#submission-form-container').fadeOut();
        $('#sensors-container').fadeOut();
    });

    $('#menu-clinic-pics').click(() => {
        $('#description-container').fadeOut();
        $('#submission-form-container').fadeOut();
        $('#sensors-container').fadeOut();
    });

    $('#menu-sensors').click(() => {
        $('#description-container').fadeOut();
        $('#submission-form-container').fadeOut();
        $('#sensors-container').fadeIn();
    });

    $('#menu-commercial').click(() => {
        $('#description-container').fadeOut();
        $('#submission-form-container').fadeIn();
        $('#sensors-container').fadeOut();
    });

    $('#menu-exit').click(() => {
        $('#description-container').fadeOut();
        $('#menu-exit').fadeOut();
        $('.item').removeClass('active');
        $('#submission-form-container').fadeOut();
        $('#sensors-container').fadeOut();
    });

    $('#description-exit').click(() => {
        $('#description-container').fadeOut();
        $('.item').removeClass('active');
    });

    $('#submission-exit').click(() => {
        $('#submission-form-container').fadeOut();
        $('.item').removeClass('active');
    });

    $('#sensors-exit').click(() => {
        $('#sensors-container').fadeOut();
        $('.item').removeClass('active');
    });

    $('.ui.menu')
        .on('click', '.item', function() {
            if(!$(this).hasClass('dropdown')) {
                $(this)
                    .addClass('active')
                    .siblings('.item')
                    .removeClass('active');
            }
        });



})