module.exports = function sub_choose(sub_length, TimeEnd) {
    if (sub_length === '1') {
        TimeEnd.setMonth(TimeEnd.getMonth() + 1)
        console.log(TimeEnd);
    } else if (sub_length === '2') {
        TimeEnd.setMonth(TimeEnd.getMonth() + 6)

    } else if (sub_length === '3') {
        TimeEnd.setFullYear(TimeEnd.getFullYear() + 1)
    }

    return TimeEnd.toISOString().slice(0, 19).replace('T', ' ');
}