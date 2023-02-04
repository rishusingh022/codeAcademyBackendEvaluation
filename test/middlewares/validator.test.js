const {urlValidator} = require('../../src/middlewares/validator');

describe('urlValidator', () => {
  it('Should return 400 as status code if url is not provided', async () => {
    const mockReq = {
      body: {
        url: '',
      },
    };
    const mockRes = {
      status : jest.fn().mockReturnThis(),
      json : jest.fn(),
    };
    const next = jest.fn();
    urlValidator(mockReq,mockRes, () => {});
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({
      message : '"url" is not allowed to be empty',
    });
    expect(next).not.toBeCalled();
  });
  it('Should return 400 as status code if url is not valid', async () => {
    const mockReq = {
      body: {
        url: 'invalid url',
      },
    };
    const mockRes = {
      status : jest.fn().mockReturnThis(),
      json : jest.fn(),
    };
    const next = jest.fn();
    urlValidator(mockReq,mockRes, () => {});
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({
      message : '"url" must be a valid uri',
    });
    expect(next).not.toBeCalled();
  });
  it('Should call next if url is validated', async () => {
    const mockReq = {
      body: {
        url: 'https://store-0001.s3.amazonaws.com/input.csv',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    await urlValidator(mockReq, mockRes, next);
    expect(next).toBeCalled();
    expect(mockRes.status).not.toBeCalled();
    expect(mockRes.json).not.toBeCalled();
  });
  it('Should return 500 if error is not HTTPError', async () => {
    const mockReq = {
      body: {
        url: 'https://store-0001.s3.amazonaws.com/input.csv',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn().mockImplementation(() => {
      throw new Error('Internal Server Error');
    });
    await urlValidator(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      message: 'Internal Server Error',
    });
  });
});