export function create(event, context, callback) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.postTable,
        Item: {
            classId: data.classId,
            faculty: data.faculty,
            name: data.name,
        }
    };

    dynamoDb.put(params, (error, data) => {
        // Set response headers to enable CORS (Cross-Origin Resource Sharing)
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };

        // Return status code 500 on error
        if (error) {
            const response = {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({ error })
            };
            callback(null, response);
            return;
        }

        // Return status code 200 and the newly created item
        const response = {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify(params.Item)
        };
        callback(null, response);
    });
}

export const get_all = handler(async (event, context) => {
    const params = {
        TableName: process.env.classTable,
    };

    const result = await dynamoDb.scan(params);
    console.log(result);

    // if (!result.Item){
    //     throw new Error("Item Not Found");
    // }

    return result.Items;
});

export const get_faculty = handler(async (event, context) => {
    const faculty = event.pathParameters.id;

    const params = {
        TableName: process.env.classTable,
        FilterExpression: "faculty = :faculty",
        ExpressionAttributeValues: {
            ":faculty": faculty
        }
    };

    const result = await dynamoDb.scan(params);
    console.log(result);

    // if (!result.Item){
    //     throw new Error("Item Not Found");
    // }

    return result.Items;
});

export const get_id = handler(async (event, context) => {