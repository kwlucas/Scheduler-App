function getHour(timeId) {
    let hour = Number(timeId.match(/(?<=time-)\d{1,2}(?=[ap])/)[0]);
    if (hour != 12 && timeId.includes('p')) {
        hour += 12;
    }
    return hour;
}

function checkTimeblock(blockEl) {
    const currentHour = moment().hours()
    const checkHour = getHour(blockEl.attr('id'));

    if (checkHour > currentHour) {
        blockEl.addClass('future');
    } else if (checkHour == currentHour) {
        blockEl.addClass('present');
        blockEl.removeClass('future');
    }
    else if (checkHour < currentHour) {
        blockEl.addClass('past');
        blockEl.removeClass('present');
        blockEl.removeClass('future');
    }
};

$('document').ready(function () {
    $('#currentDay').text(moment().format('dddd, MMMM Do, YYYY'));

    $('.saveBtn').on('click', function () {
        localStorage.setItem($(this).parent().attr('id'), $(this).siblings('.description').val());
    });

    $('.time-block').each(function () {
        $(this).children('.description').val(localStorage.getItem($(this).attr('id')));
        checkTimeblock($(this));
    });

    function updateBlocks() {
        $('.time-block').each(function () {
            checkTimeblock($(this));
        });
    };
    let updateInterval = setInterval(updateBlocks, 15000);
})