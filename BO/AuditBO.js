const AuditBO = class {

    constructor() {}
    
    async getAudits(params){
        try {
            const result = await database.executeQuery("security", "getAudits", []);
        
            if (!result || !result.rows) {
              return { sts: false, msg: "Error al obtener auditorias" };
            }
        
            return { sts: true, data: result.rows };
          } catch (error) {
            console.error("Error en getAudits:", error);
            return { sts: false, msg: "Error al ejecutar la consulta" };
          }
    }
}

module.exports = AuditBO;