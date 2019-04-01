const express = require('express')

module.exports = function(server){
    //url base
    const router = express.Router()
    server.use('/api', router)

    //rotas do ciclo de pagamentos
    const CicloPagamentos = require('../api/billingCycle/billingCycleService')
    CicloPagamentos.register(router, '/ciclospagamento')
}