const FolderBO = class {

    constructor() {}
    
    async getUserFolders(params){
        try {
            const result = await database.executeQuery("public", "getUserFolders", [
              ss.sessionObject.userId
            ]);
        
            if (!result || !result.rows) {
              console.error("La consulta no devolvio resultados");
              return { sts: false, msg: "Error al obtener carpetas del usuario" };
            }
        
            return { sts: true, data: result.rows };
            
          } catch (error) {
            console.error("Error en getUserFolders:", error);
            return { sts: false, msg: "Error al ejecutar la consulta" };
          }
    }

    async getFolder(params){
        try {
            const result = await database.executeQuery("public", "getFolder", [
              params.folderId
            ]);
        
            if (!result || !result.rows) {
              console.error("La consulta no devolvio resultados");
              return { sts: false, msg: "Error al obtener la carpeta" };
            }
        
            return { sts: true, data: result.rows };
            
          } catch (error) {
            console.error("Error en getFolder:", error);
            return { sts: false, msg: "Error al ejecutar la consulta" };
          }
    }
    
    async createFolder(params) {
      try {
        const result = await database.executeQuery("public", "createFolder", [
          params.folderName,
          ss.sessionObject.userId
        ]);
        if (result && result.rowCount > 0) {
          return { sts: true, msg: "  Carpeta creada correctamente" };
        } else {
          return { sts: false, msg: "No se pudo crear la carpeta" };
        }
      } catch (error) {
        console.error("Error en createFolder:", error);
        return { sts: false, msg: "Error al crear la carpeta" };
      }
    }

    async updateFolder(params) {
      try {
        const result = await database.executeQuery("public", "updateFolder", [
          params.folderId,
          params.folderName
        ]);
        if (result && result.rowCount > 0) {
          return { sts: true, msg: "Carpeta actualizada correctamente" };
        } else {
          return { sts: false, msg: "No se pudo actualizar las carpetas" };
        }
      } catch (error) {
        console.error("Error en updateFolder:", error);
        return { sts: false, msg: "Error al actualizar las carpetas" };
      }
    }

    async deleteFolder(params) {
      try {
        const resultNotes = await database.executeQuery("public", "deleteFolderNotes", [
          params.folderId
        ])

        if (!resultNotes) {
          return { sts: false, msg: "No se pudieron eliminar las notas de la carpeta" };
        }
      
        const result = await database.executeQuery("public", "deleteFolder", [
          params.folderId
        ]);

        if (!result) {
          return { sts: false, msg: "No se pudo eliminar la carpeta" };
        }

        return { sts: true, msg: "Carpeta eliminada exitosamente" };

      } catch (error) {
        console.error("Error en deleteFolders:", error);
        return { sts: false, msg: "Error al eliminar la carpeta" };
      }
    }
}

module.exports = FolderBO;