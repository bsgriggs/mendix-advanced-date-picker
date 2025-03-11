const RemoveTime = (date: Date): Date => {
    if (date === undefined || date === null) {
        return date;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export default RemoveTime;
