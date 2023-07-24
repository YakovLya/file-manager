const errorHandler = async (error) => {
    if (error.message == 'Invalid input')
        console.log('Invalid input')
    else if (error.message == 'Operation failed')
        console.log('Operation failed')
    else
        throw error
}

export { errorHandler }