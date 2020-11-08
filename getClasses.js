import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.classTable,
        Key: {
            classId: event.pathParameters.id
        }
    };
    const result = await dynamoDb.get(params);
    if (!result.Item){
        throw new Error("Item Not Found");
    }
    return result.Item;
});