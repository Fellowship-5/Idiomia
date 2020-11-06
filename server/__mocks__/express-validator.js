const validationResult = jest.fn();

function getMockErrors(overrideErrors) {
    return {
        isEmpty: jest.fn().mockReturnValueOnce(true),
        ...overrideErrors
    }
}

exports.validationResult = validationResult;
exports.getMockErrors = getMockErrors;