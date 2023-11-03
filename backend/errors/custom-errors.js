class customErrors extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode ;
    }
}

class NotFoundError extends customErrors{
    constructor(message){
        super(message)
        this.statusCode = 404 ;
    }
}

class BadRequestError extends customErrors{
    constructor(message){
        super(message)
        this.statusCode = 400 ;
    }
}

class UnAuthorizedError extends customErrors{
    constructor(message){
        super(message)
        this.statusCode = 401 ;
    }
}

module.exports = {
    customErrors,
    NotFoundError,
    BadRequestError,
    UnAuthorizedError
}

