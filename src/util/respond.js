export class respond extends Response {
    constructor(body, init) {
        const jsonBody = JSON.stringify(body);
        init = init || {
            headers: {
                'Content-Type': 'application/json'
            },
        };
        super(jsonBody, init);
    }
};