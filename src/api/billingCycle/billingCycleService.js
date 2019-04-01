const CicloPagamentos = require('./billingCycle')
const erroHandler = require('../comum/erroHandler')

CicloPagamentos.methods(['get','post','put','delete'])
CicloPagamentos.updateOptions({new: true, runValidators: true})
CicloPagamentos.after('post', erroHandler).after('put   ', erroHandler)

CicloPagamentos.route('qtd', (req, res, next) => {
    CicloPagamentos.countDocuments((error, value) =>{
        if (error){
            res.status(500).json({erros: [error]})
        } else{
            res.json({qtd: value})
        }
    })
})

CicloPagamentos.route('total',(req, res, next) =>{
    CicloPagamentos.aggregate([
        { $project: { credito: {$sum: "$creditos.valor"}, debito: {$sum: "$debitos.valor"}}},
        { $group: {_id: null, credito: {$sum: "$credito"}, debito: {$sum: "$debito"}}},
        { $project: {_id: 0, credito: 1, debito: 1}}, 
        
    ]).exec((error, result) =>{
        if (error) {
            res.status(500).json({erros: [error]})
        } else {
            res.json(result[0] || { credito: 0, debito: 0})
        }
    })
})

module.exports = CicloPagamentos