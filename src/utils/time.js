import moment from 'moment';

export function FormatterTime(row, column, cellValue, index) {
    const newDate = new Date();
    return moment(newDate.setTime(cellValue * 1000)).format('YYYY-MM-DD- hh:mm:ss');

}
