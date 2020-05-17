import moment from 'moment';

const now = moment();
const currentMonth = now.format('MMMM');

function isAvailableNow(item) {
    const validMonth = item.fields.monthsN.includes(currentMonth);

    var validTime = null;

    if (!item.fields.timeStartA) {
        validTime = true;
    } else {
        var startA = Number(moment(item.fields.timeStartA).format('HH')),
            endA = Number(moment(item.fields.timeEndA).format('HH')),
            currentHour = Number(now.format('HH'));

        validTime = currentHour >= startA && currentHour < endA;

        if (!validTime && item.fields.timeStartB) {
            var startB = Number(moment(item.fields.timeStartB).format('HH')),
                endB = Number(moment(item.fields.timeEndB).format('HH'));

            validTime = currentHour >= startB && currentHour < endB;
        }
    }

    return validMonth && validTime;
}

export default isAvailableNow;
