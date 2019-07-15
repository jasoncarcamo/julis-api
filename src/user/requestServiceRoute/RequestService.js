const requestService = {
    newService(db, newService){
        return db.insert(newService).into('services').returning('*').then(([service])=> service)
    }
}

module.exports = requestService;