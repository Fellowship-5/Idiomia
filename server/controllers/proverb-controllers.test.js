const { validationResult } = require('express-validator');

const { generateProverb } = require('../__mocks__/proverbs');
const { getMockControllerArgs } = require('../__mocks__/express-mocks');
const { getMockErrors } = require('../__mocks__/express-validator');
const Proverb = require('../models/proverb');
const { postProverb } = require('./proverbs-controllers');

describe('proverbs controllers', () => {
    beforeEach(() => {
        validationResult.mockReturnValue(getMockErrors());
        jest.clearAllMocks();
    });

    describe('postProverb', () => {
        it('should return a 422 error when there are validation errors', async () => {
            const { req, res, next } = getMockControllerArgs();
            const mockErrors = getMockErrors({
                    isEmpty: jest.fn().mockReturnValueOnce(false)
            })

            validationResult.mockReturnValueOnce(mockErrors);

            await postProverb(req, res, next);

            expect(res.status).toHaveBeenCalledWith(422);
            expect(res.json).toHaveBeenCalledWith(mockErrors);
            expect(next).toHaveBeenCalledWith(mockErrors);
        });

        it('should return a 500 error when the proverb was not saved', async () => {
            const { req, res, next } = getMockControllerArgs({
                body: generateProverb()
            });
            const saveSpy = jest.spyOn(Proverb.prototype, 'save');

            saveSpy.mockRejectedValueOnce('error');

            await postProverb(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Could not save user in database '
            });
            expect(next).toHaveBeenCalledWith('error');
        });

        it('should return a 201 with the new proverb when it was saved', async () => {
            const mockProverb = generateProverb();
            const { req, res, next } = getMockControllerArgs({
                body: mockProverb
            });
            const saveSpy = jest.spyOn(Proverb.prototype, 'save');

            saveSpy.mockResolvedValueOnce({});

            await postProverb(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                proverb: expect.objectContaining({
                    ...mockProverb,
                    date: expect.any(Date)
                })
            });
            expect(next).toHaveBeenCalledTimes(0);
        });
    });
});

