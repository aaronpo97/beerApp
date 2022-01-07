class ServerError extends Error {
	constructor(message, status, name = 'ServerError') {
		super();
		this.message = message;
		this.status = status;
	}
}

export default ServerError;
