export function FormatterTime(row, column, cellValue, index) {
    if (cellValue > 0) {
        const newDate = new Date();
        newDate.setTime(cellValue * 1000);
        return newDate.toLocaleString();
    } else {
        return '-';
    }
}
export function FormatterDate(row, column, cellValue, index) {
    if (cellValue > 0) {
        const newDate = new Date();
        newDate.setTime(cellValue * 1000);
        return newDate.toLocaleDateString();
    } else {
        return '-';
    }
}

