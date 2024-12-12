const MxParser = (str: string, dateFormat: string): Date | null => {
    /* eslint-disable */
    // @ts-ignore
    return mx.parser.parseValue(str, "datetime", { datePattern: dateFormat });
    /* eslint-enable */
};
export default MxParser;
