const Response = class {
	constructor(message, status) {
		this.message = message;
		this.status = status;
	}
};

export const SuccessResponse = class extends Response {
	constructor(message, status, payload, newAccessToken) {
		super(message, status);
		this.success = true;
		this.payload = payload;
		this.newAccessToken = newAccessToken;
	}
};

export const ErrorResponse = class extends Response {
	constructor(message, status, stack) {
		super(message, status);
		this.stack = stack;
		this.success = false;
	}
};
