const dayjs = require('dayjs');

const NoteBO = class {

    constructor() {}
    
    async getAllUserNotes(params){
        try {
            const result = await database.executeQuery("public", "getAllUserNotes", [
              ss.sessionObject.userId
            ]);
        
            if (!result || !result.rows) {
              console.error("La consulta no devolvio resultados");
              return { sts: false, msg: "Error al obtener notas del usuario" };
            }
      
            return { sts: true, data: result.rows };

          } catch (error) {
            console.error("Error en getAllUserNotes:", error);
            return { sts: false, msg: "Error al ejecutar la consulta" };
          }
    }

    async getPublicNotes(params){
        try {
            const result = await database.executeQuery("public", "getPublicNotes", []);
        
            if (!result || !result.rows) {
              console.error("La consulta no devolvio resultados");
              return { sts: false, msg: "Error al obtener notas publicas" };
            }
      
            return { sts: true, data: result.rows };

          } catch (error) {
            console.error("Error en getPublicNotes:", error);
            return { sts: false, msg: "Error al ejecutar la consulta" };
          }
    }

    async getFavUserNotes(params){
        try {
            const result = await database.executeQuery("public", "getFavUserNotes", [
              ss.sessionObject.userId
            ]);
        
            if (!result || !result.rows) {
              console.error("La consulta no devolvio resultados");
              return { sts: false, msg: "Error al obtener notas favoritas del usuario" };
            }
      
            return { sts: true, data: result.rows };

          } catch (error) {
            console.error("Error en getFavUserNotes:", error);
            return { sts: false, msg: "Error al ejecutar la consulta" };
          }
    }

    async getNotesByFolder(params){
        try {
            const result = await database.executeQuery("public", "getNotesByFolder", [
              params.folderId
            ]);
        
            if (!result || !result.rows) {
              console.error("La consulta no devolvio resultados");
              return { sts: false, msg: "Error al obtener notas por categoria" };
            }
        
            return { sts: true, data: result.rows };
          } catch (error) {
            console.error("Error en getNotesByFolder:", error);
            return { sts: false, msg: "Error al ejecutar la consulta" };
          }
    }

    async addFavorite(params) {
      try {
          const result = await database.executeQuery("public", "addFavorite", [
            ss.sessionObject.userId,
            params.noteId
          ]);

          if (result && result.rowCount > 0) {
            console.log("Nota insertada en favoritos");
          } else {
            return { sts: false, msg: "No se pudo insertar la nota en favoritos" };
          }

        return { sts: true, msg: "Nota insertada en favoritos" };
        
      } catch (error) {
        console.error("Error en addFavorite:", error);
        return { sts: false, msg: "Error al añadir a favoritos" };
      }
    }

    async removeFavorite(params) {
      try {
          const result = await database.executeQuery("public", "removeFavorite", [
            params.noteId,
            ss.sessionObject.userId
          ]);

          if (result && result.rowCount > 0) {
            console.log("Nota quitada de favoritos");
          } else {
            return { sts: false, msg: "No se pudo quitar la nota de favoritos" };
          }

        return { sts: true, msg: "Nota quitada de favoritos" };
        
      } catch (error) {
        console.error("Error en removeFavorite:", error);
        return { sts: false, msg: "Error al quitar de favoritos" };
      }
    }

    async isInFavorites(params){
        try {
            const result = await database.executeQuery("public", "isInFavorites", [
              params.noteId,
              ss.sessionObject.userId
            ]);
        
            if (!result || !result.rows) {
              console.error("La consulta no devolvio resultados");
              return { sts: false, msg: "Error al obtener si esta en favoritos" };
            }
        
            return { sts: true, data: result.rows };

          } catch (error) {
            console.error("Error en isInFavorites:", error);
            return { sts: false, msg: "Error al ejecutar la consulta" };
          }
    }
  
    async createNote(params) {
      try {
          const result = await database.executeQuery("public", "createNote", [
              params.title,
              params.description,
              dayjs().format('YYYY-MM-DD'),
              params.privacy,
              ss.sessionObject.userId,
              params.content,
              params.id_weight
          ]);

          if (result && result.rowCount > 0) {
            console.log("Nota insertada");
          } else {
            return { sts: false, msg: "No se pudo crear la nota" };
          }

          const id_note = result.rows[0].id_note;

        if (params.folderId != 0){
          const resultCategory = await database.executeQuery("public", "assignNoteFolder", [
            params.folderId,
            id_note
          ])

          if (resultCategory && resultCategory.rowCount > 0) {
            console.log( "Categoria asignada correctamente");
          } else {
            return { sts: false, msg: "No se pudo asignar la categoria" };
          }
        } 

        return { sts: true, msg: "Nota creada correctamente" };
        
      } catch (error) {
        console.error("Error en createNote:", error);
        return { sts: false, msg: "Error al crear la nota" };
      }
    }

    async updateNote(params) {
      console.log('-------------------------------------');
      console.log(`title: ${params.title}`);
      console.log(`desc: ${params.description}`);
      console.log(`priv: ${params.privacy}`);
      console.log(`cont: ${params.content}`);
      console.log(`we: ${params.id_weight}`);
      console.log(`idnot: ${params.id_note}`);
      console.log('-------------------------------------');
      try {
        const result = await database.executeQuery("public", "updateNote", [
          params.title, 
          params.description,
          params.privacy,
          params.content,
          params.id_weight,
          params.date,
          params.id_note
        ]);
        if (result && result.rowCount > 0) {
          return { sts: true, msg: "Nota actualizada correctamente" };
        } else {
          return { sts: false, msg: "No se pudo actualizar las notas" };
        }
      } catch (error) {
        console.error("Error en updateNote:", error);
        return { sts: false, msg: "Error al actualizar las notas" };
      }
    }

    async deleteNote(params) {
      try {
        const resultFolder = await database.executeQuery("public", "deleteNoteFromFolder", [params.noteId]);
        if (resultFolder) {
          console.log("Nota eliminada de la/s carpetas");
        } else {
          return { sts: false, msg: "No se pudo eliminar la nota de la/s carpeta/s" };
        }

        const resultFavs = await database.executeQuery("public", "deleteNoteFromFavs", [params.noteId]);
        if (resultFavs) {
          console.log("Nota eliminada de favoritos");
        } else {
          return { sts: false, msg: "No se pudo eliminar la nota de favoritosla/s carpeta/s" };
        }

        const result = await database.executeQuery("public", "deleteNote", [params.noteId]);
        if (result) {
          return { sts: true, msg: "Nota eliminada correctamente" };
        } else {
          return { sts: false, msg: "No se pudo eliminar la nota" };
        }
      } catch (error) {
        console.error("Error en deleteNote:", error);
        return { sts: false, msg: "Error al eliminar la nota" };
      }
    }

    async deleteNotes(params) {
      try {
        const resultFavs = await database.executeQuery("public", "deleteNotesFromFavs", [params.notesIds]);
        if (resultFavs) {
          console.log("Notas eliminadas de favoritos");
        } else {
          return { sts: false, msg: "No se pudo eliminar las notas de favoritos" };
        }

        const result = await database.executeQuery("public", "deleteNotes", [params.notesIds]);
        if (result) {
          return { sts: true, msg: "Notas eliminadas correctamente" };
        } else {
          return { sts: false, msg: "No se pudo eliminar las notas" };
        }
      } catch (error) {
        console.error("Error en deleteNotes:", error);
        return { sts: false, msg: "Error al eliminar las notas" };
      }
    }
}

module.exports = NoteBO;