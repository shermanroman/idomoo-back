import axios from 'axios';
import { Buffer } from 'buffer';

export const handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const { ACCOUNT_ID, API_SECRET_KEY } = process.env; // Retrieve the account ID and API secret key from environment variables

        const tokenString = `${ACCOUNT_ID}:${API_SECRET_KEY}`;
        const encodedToken = Buffer.from(tokenString).toString('base64');
        const authHeader = `Basic ${encodedToken}`;

        switch (event.routeKey) {
            case 'GET /storyboards/{id}':
                const id = event.pathParameters.id;
                const getStoryboardOptions = {
                    method: 'GET',
                    url: `https://usa-api.idomoo.com/api/v2/storyboards/${id}`,
                    headers: {
                        'Authorization': authHeader,
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
                        'Authorization': authHeader,
                        'Accept': 'application/json',
                    },
                };
                const getStoryboardsResponse = await axios(getStoryboardsOptions);
                body = getStoryboardsResponse.data;
                break;
            case 'POST /storyboards/generate':
                
                let requestJSON = JSON.parse(event.body);

                const generateOptions = {
                    method: 'POST',
                    url: 'https://usa-api.idomoo.com/api/v2/storyboards/generate',
                    headers: {
                        'Authorization': authHeader,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: {
                        "storyboard_id": 31193,
                        "output": {
                            "video": [
                                {
                                    "video_type": requestJSON['videoFormat'],
                                    "height": requestJSON['resolution'],
                                    "Quality": requestJSON['quality'],
                                }
                            ]
                        },
                        "data": [
                            {
                                "key": "Address",
                                "val": requestJSON['Address'],
                                "description": "test address"
                            },
                            {
                                "key": "Email address",
                                "val": requestJSON['Email address'],
                                "description": "my email address"
                            },
                            {
                                "key": "First name",
                                "val": requestJSON['First name'],
                                "description": "my first name"
                            },
                            {
                                "key": "Middle name",
                                "val": requestJSON['Middle name'],
                                "description": "my middle name"
                            },
                            {
                                "key": "Last name",
                                "val": requestJSON['Last name'],
                                "description": "my last name"
                            }
                        ]
                    },
                };
                const generateResponse = await axios(generateOptions);
                body = generateResponse.data;
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
