import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export function create_class(event, context, callback) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.classTable,
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

    return result.Items;
});

export const get_all_faculties = handler(async (event, context) => {
    const params = {
        TableName: process.env.classTable,
    };

    const result = await dynamoDb.scan(params);
    if (!result.Items) {
        console.log("Error");
    }
    let faculties = [];
    result.Items.forEach(item => {
        if (!faculties.includes(item.faculty)) {
            faculties.push(item.faculty);
        }
    });
    return faculties;
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
    // if (!result.Item){
    //     throw new Error("Item Not Found");
    // }

    return result.Items;
});

export const get_id = handler(async (event, context) => {
    const params = {
        TableName: process.env.classTable,
        Key: {
            classId: event.pathParameters.id
        }
    };
    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error("Item Not Found");
    }
    return result.Item;
});

export async function create_post(event, context, callback) {
    // Request body is passed in as a JSON encoded string in 'event.body'

    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.classTable,
        // 'Key' defines the partition key and sort key of the item to be updated
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            classId: event.pathParameters.id
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET posts = list_append(posts, :post)",
        ExpressionAttributeValues: {
            ":post": data.post || null
        },
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW"
    };
    await dynamoDb.update(params);
    return { status: true };
}