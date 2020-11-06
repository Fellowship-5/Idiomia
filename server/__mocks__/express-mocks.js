function getMockControllerArgs(
    overrideReq,
    overrideRes,
    overrideNext
) {
    return {
        req: getMockRequest(overrideReq),
        res: getMockResponse(overrideRes),
        next: overrideNext || jest.fn()
    }
}

function getMockResponse(overrideResponse) {
    const res = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return {...res, ...overrideResponse};
}

function getMockRequest(overrideRequest) {
    return {
        body: {},
        ...overrideRequest
    }
}

exports.getMockResponse = getMockResponse;
exports.getMockRequest = getMockRequest;
exports.getMockControllerArgs = getMockControllerArgs;