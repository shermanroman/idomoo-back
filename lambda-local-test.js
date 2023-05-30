const axios = require('axios');

const handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        switch (event.routeKey) {
            case 'GET /storyboards/{id}':
                const id = event.pathParameters.id;
                const getStoryboardOptions = {
                    method: 'GET',
                    url: `https://usa-api.idomoo.com/api/v2/storyboards/${id}`,
                    headers: {
                        'Authorization': 'Basic MzU1MDpQaUtRMXhmdUtDMjJjMWM1YzAwNjFhZjEyYTI0MGUwOTJkOTNlYzZhNDdnbWNrd1FHaHA2',
                        'Accept': 'application/json',
                    },
                };
                const getStoryboardResponse = await axios(getStoryboardOptions);
                body = getStoryboardResponse.data;
                break;
            case 'GET /storyboards':
                const getStoryboardsOptions = {
                    method: 'GET',
                    url: 'https://usa-api.idomoo.com/api/v2/storyboards',
                    headers: {
                        'Authorization': 'Basic MzU1MDpQaUtRMXhmdUtDMjJjMWM1YzAwNjFhZjEyYTI0MGUwOTJkOTNlYzZhNDdnbWNrd1FHaHA2',
                        'Accept': 'application/json',
                    },
                };
                const getStoryboardsResponse = await axios(getStoryboardsOptions);
                body = getStoryboardsResponse.data;
                break;
            case 'POST /storyboards/generate':
                // Retrieve video_type from the request
                body = 'hello world';
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};

// Simulate an event for testing
const event = {
    routeKey: 'POST /storyboards/generate',
};

// Execute the handler function with the event
handler(event)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    });
