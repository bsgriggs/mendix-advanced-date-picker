const MxFormatter = (date: Date | null, dateFormat: string): string => {
    /* eslint-disable */
    // @ts-ignore
    return mx.parser.formatValue(date, "datetime", { datePattern: dateFormat });
    /* eslint-enable */
};
export default MxFormatter;
