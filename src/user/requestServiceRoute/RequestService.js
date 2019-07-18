const requestService = {
    getServiceByUserId(db, user_id){
        return db.select('*').from('services').where({user_id});
    },
    getServiceByServiceId(db, id){
        return db.select('*').from('services').where({id});
    },
    newService(db, newService){
        return db.insert(newService).into('services').returning('*').then(([service])=> service)
    },
    updateService(db, newService){
        return db.update(newService).from('services').where({id: newService.id})
    },
    deleteService(db , id){
        
        return db.delete().from('services').where({id});
    }
}

module.exports = requestService;