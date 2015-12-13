getLimitQuery = function (limit) {
    let limitQuery = '';
    if (limit) {
        let limitParsed;
        try {
            limitParsed = parseInt(limit);

            if (limitParsed && limitParsed > 0) {
                limitQuery = `LIMIT ${limit}`;
            }
        } catch (exception) {
            // catch in case cannot parse limit
        }
    }
    return limitQuery
};
