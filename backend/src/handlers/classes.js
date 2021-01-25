/**
 * THe entry point for all class related endpoints
 */

import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";


export const create = handler(async (event, context) => {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    // TODO: validate that the request payload is valid
    // if (!data) {
    //     const headers = {
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Credentials": true
    //     };
    //     const response = {
    //         statusCode: 400,
    //         headers: headers,
    //         body: JSON.stringify({
    //             message: "Body was not passed in the request!"
    //         })
    //     };
    //     callback(null, response);
    // }
    // // TODO: validate that the request payload is valid
    // if (!data.classId) {
    //     const headers = {
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Credentials": true
    //     };
    //     const response = {
    //         statusCode: 400,
    //         headers: headers,
    //         body: JSON.stringify({
    //             message: "classId was not passed in the request!"
    //         })
    //     };
    //     callback(null, response);
    // }
    // if (!data.faculty) {
    //     const headers = {
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Credentials": true
    //     };
    //     const response = {
    //         statusCode: 400,
    //         headers: headers,
    //         body: JSON.stringify({
    //             message: "faculty was not passed in the request!"
    //         })
    //     };
    //     callback(null, response);
    // }
    // if (!data.name) {
    //     const headers = {
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Credentials": true
    //     };
    //     const response = {
    //         statusCode: 400,
    //         headers: headers,
    //         body: JSON.stringify({
    //             message: "name was not passed in the request!"
    //         })
    //     };
    //     callback(null, response);
    // }

    const params = {
        TableName: process.env.classTable,
        Item: {
            classId: data.classId,
            faculty: data.faculty,
            name: data.name,
        }
    };

    await dynamoDb.put(params);
    return params.Item;
});

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

export const create_post = handler(async (event, context, callback) => {
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
});

export const list = handler(async (event, context) => {
  const params = {
    TableName: process.env.classTable,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "faculty = :faculty",
    ExpressionAttributeValues: {
      ":faculty": event.pathParameters.id
    }
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
});
