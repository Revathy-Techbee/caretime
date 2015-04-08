function floatToTime(duration) {
    var total = parseFloat(Math.round(duration * 100) / 100).toFixed(2);

    var num = total * 60;
    var quotient = num / 60;
    var hours = Math.floor(quotient);
    var minutes = Math.floor(num % 60);
    return (hours + ':' + minutes);

}