/**
 * @name sub_choose
 * @description returns the new subscription's end time
 * @param {String} sub_length the length of the subscription (1 1 month/2 3 months/3 1 year)
 * @param {Date} TimeEnd the end of the current active subscription date
 */
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