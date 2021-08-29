
/*
    Form
*/
$('.registration-form').children('fieldset').first().fadeIn('slow');


//clear data from inputs whichcontains not 
$('.registration-form input[type="number"], .registration-form input[type="text"]').each(function (index, element) {
    var inputId = $(element).attr("id");
    var inputValue = parseFloat($(element).val());
    if (inputValue <= 0)
        $(element).val("");
});

$(window).keydown(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        return false;
    }
});

function exitSearch(propertyId) {
    if (!propertyId)
        window.location.href = "/MortgagePrograms/Wizard";
    else
        window.location.href = "/Properties/Details?id=" + propertyId;
}


$('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea').on('focus', function () {
    $(this).removeClass('input-error');
});


// Show Details
$('.show-details').on('click', function () {
    $(this).parent().find("#show-details").toggle();
    $(this).parent().find("#details").toggle(100);
});

$('.hide-details').on('click', function () {
    $(this).parent().toggle(100);
    $(this).parent().parent().find("#show-details").toggle();
});

// Read More
$('.read-more').on('click', function () {
    $(this).parent().parent().find("#description-abstract").slideUp();
    $(this).parent().parent().find("#description-more").slideDown();
});

$('.read-less').on('click', function () {
    $(this).parent().parent().find("#description-abstract").slideDown();
    $(this).parent().parent().find("#description-more").slideUp();
});

