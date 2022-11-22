function getHour(timeId){
    let hour = Number(timeId.match(/(?<=time-)\d{1,2}(?=[ap])/)[0]);
    if(hour != 12 && timeId.includes('p')){
        hour += 12;
    }
    return hour;
}

$('document').ready(function () {
    $('#currentDay').text(moment().format('dddd, MMMM Do, YYYY'));
})