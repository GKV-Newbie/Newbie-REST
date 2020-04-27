const ProcedureAccessManager = require('./procedure-access-manager')
const ProcedureReadManager = require('./procedure-read-manager')
const ProcedureShareManager = require('./procedure-share-manager')
const ProcedureWriteManager = require('./procedure-write-manager')

module.exports = {
    canRead:ProcedureAccessManager.canRead,
    canUpdate:ProcedureAccessManager.canUpdate,

    getProcedure:ProcedureReadManager.getProcedure,
    listAllProcedures:ProcedureReadManager.listAllProcedures,
    listOwnedProcedures:ProcedureReadManager.listOwnedProcedures,
    listChildProcedures:ProcedureReadManager.listChildProcedures,
    listOwnedProceduresByEmail:ProcedureReadManager.listOwnedProceduresByEmail,
    listSharedAccessProcedures:ProcedureReadManager.listSharedAccessProcedures,

    giveAccess:ProcedureShareManager.giveAccess,
    removeAccess:ProcedureShareManager.removeAccess,

    createProcedure:ProcedureWriteManager.createProcedure,
    updateProcedure:ProcedureWriteManager.updateProcedure
}