function getHour(timeId) {
    //Using regex get the number value of the hour from the element id. ("time-1p" >> 1)
    let hour = Number(timeId.match(/(?<=time-)\d{1,2}(?=[ap])/)[0]);
    //If the id has a "p" in it (meaning it is pm) AND the hour number is not 12, add 12 to the number to convert it to 24hr time.
    if (hour != 12 && timeId.includes('p')) {
        hour += 12;
    }
    return hour;
}

//Function for setting the color of a time block element
function checkTimeblock(blockEl) {
    //Get the current hour (time)
    const currentHour = moment().hours()
    //Get the id of the block element and use the getHour function to get the hour it relates to
    const checkHour = getHour(blockEl.attr('id'));

    //If the block's hour is greater than the current hour give it the class "future"
    if (checkHour > currentHour) {
        blockEl.addClass('future');
    } //Otherwise if the block's hour is equal to the current hour give it the class "present"
    else if (checkHour == currentHour) {
        blockEl.addClass('present');
        blockEl.removeClass('future');
    } //Otherwise if the block's hour is less than the current hour give it the class "past"
    else if (checkHour < currentHour) {
        blockEl.addClass('past');
        blockEl.removeClass('present');
        blockEl.removeClass('future');
    }
};

//When the page loads
$('document').ready(function () {
    //Set the currentDay element's text to the current date.
    $('#currentDay').text(moment().format('dddd, MMMM Do, YYYY'));

    //Whenever a save button is clicked set the local storage item for the related hour to hold the value entered in the input space
    $('.saveBtn').on('click', function () {
        localStorage.setItem($(this).parent().attr('id'), $(this).siblings('.description').val());
    });

    //For every time block set the description section to the values stored in local storage and set its color using function
    $('.time-block').each(function () {
        $(this).children('.description').val(localStorage.getItem($(this).attr('id')));
        checkTimeblock($(this));
    });

    // Function to update the colors of all the blocks
    function updateBlocks() {
        $('.time-block').each(function () {
            checkTimeblock($(this));
        });
    };
    //Make it so the updateBlock function runs every 15 seconds
    let updateInterval = setInterval(updateBlocks, 15000);
})