const MenuBO = class {
  constructor() {}

  async getMenus(params) {
    try {
      const result = await database.executeQuery("security", "getMenus", []);
      if (!result || !result.rows) {
        console.error("La consulta no devolvió resultados");
        return { sts: false, msg: "Error al obtener los menus" };
      }
      return { sts: true, data: result.rows };
    } catch (error) {
      console.error("Error en getMenus:", error);
      return { sts: false, msg: "Error al ejecutar la consulta" };
    }
  }

  async getModules(params) {
    try {
      const result = await database.executeQuery("security", "getModules", []);
      if (!result || !result.rows) {
        console.error("La consulta no devolvió resultados");
        return { sts: false, msg: "Error al obtener los modulos" };
      }
      return { sts: true, data: result.rows };
    } catch (error) {
      console.error("Error en getModules:", error);
      return { sts: false, msg: "Error al ejecutar la consulta" };
    }
  }

  async createMenu(params) {
      try {
        // Validar que existan todos los datos obligatorios
        const { menuName, id_module } = params;
        
        if (!menuName || !id_module) {
          return { sts: false, msg: "Faltan datos obligatorios" };
        }
        
        // Insertar el menu en la tabla security.menu
        const menuResult = await database.executeQuery("security", "createMenu", [
          menuName,
          id_module
        ]);
        if (!menuResult) {
          console.error("No se pudo crear el menu");
          return { sts: false, msg: "No se pudo crear el menu" };
        }

        return { sts: true, msg: "Menú creado exitosamente" };
      } catch (error) {
        console.error("Error en createMenu:", error);
        return { sts: false, msg: "Error al crear el menu" };
      }
    }

    async updateMenu(params) {
      try {
        // Validar que existan todos los datos obligatorios
        const { menu, id_module, id_menu } = params;
        
        if (!menu || !id_module || !id_menu) {
          return { sts: false, msg: "Faltan datos obligatorios" };
        }
        
        // Insertar el menu en la tabla security.menu
        const menuResult = await database.executeQuery("security", "updateMenu", [
          menu,
          id_module,
          id_menu
        ]);
        if (!menuResult) {
          console.error("No se pudo actualizar el menu");
          return { sts: false, msg: "No se pudo actualizar el menu" };
        }

        return { sts: true, msg: "Menú actualizado exitosamente" };
      } catch (error) {
        console.error("Error en updateMenu:", error);
        return { sts: false, msg: "Error al actualizar el menu" };
      }
    }

    async deleteMenus(params) {
      try {
        const { ids } = params; // Recibe un array de IDs
    
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
          return { sts: false, msg: "Faltan datos obligatorios o formato incorrecto" };
        }
    
        const menuResult = await database.executeQuery("security", "deleteMenus", [params.ids]);
    
        if (!menuResult) {
          console.error("No se pudieron eliminar los menús");
          return { sts: false, msg: "No se pudieron eliminar los menús" };
        }
    
        return { sts: true, msg: "Menús eliminados exitosamente" };
      } catch (error) {
        console.error("Error en deleteMenus:", error);
        return { sts: false, msg: "Error al eliminar los menús" };
      }
    }

    async createModule(params) {
      try {
        // Validar que existan todos los datos obligatorios
        const { module } = params;
        
        if (!module) {
          return { sts: false, msg: "Faltan datos obligatorios" };
        }
        
        // Insertar el menu en la tabla security.menu
        const moduleResult = await database.executeQuery("security", "createModule", [module]);
        if (!moduleResult) {
          console.error("No se pudo crear el modulo");
          return { sts: false, msg: "No se pudo crear el modulo" };
        }

        return { sts: true, msg: "Modulo creado exitosamente" };
      } catch (error) {
        console.error("Error en createModule:", error);
        return { sts: false, msg: "Error al crear el modulo" };
      }
    }

    async updateModule(params) {
      try {
        // Validar que existan todos los datos obligatorios
        const { module, id_module } = params;   
        
        if (!module) {
          return { sts: false, msg: "Faltan datos obligatorios" };
        }
        
        // Insertar el menu en la tabla security.menu
        const moduleResult = await database.executeQuery("security", "updateModule", [module, id_module]);
        if (!moduleResult) {
          console.error("No se pudo actualizar el modulo");
          return { sts: false, msg: "No se pudo actualizar el menu" };
        }

        return { sts: true, msg: "Modulo actualizado exitosamente" };
      } catch (error) {
        console.error("Error en updateModule:", error);
        return { sts: false, msg: "Error al actualizar el modulo" };
      }
    }

    async deleteModules(params) {
      try {
        const { ids } = params; // Recibe un array de IDs
        console.log(params);
        
    
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
          return { sts: false, msg: "Faltan datos obligatorios o formato incorrecto" };
        }
    
        const moduleResult = await database.executeQuery("security", "deleteModules", [params.ids]);
    
        if (!moduleResult) {
          console.error("No se pudieron eliminar los modulos");
          return { sts: false, msg: "No se pudieron eliminar los modulos" };
        }
    
        return { sts: true, msg: "Modulos eliminados exitosamente" };
      } catch (error) {
        console.error("Error en deleteModules:", error);
        return { sts: false, msg: "Error al eliminar los modulos" };
      }
    }

    //Permisos a menus
    async getPermissionMenus(params) {
      try {
        const result = await database.executeQuery("security", "getPermissionMenus", []);
        if (!result || !result.rows) {
          console.error("La consulta no devolvió resultados");
          return { sts: false, msg: "Error al obtener los menus" };
        }

        return { sts: true, data: result.rows };
      } catch (error) {
        console.error("Error en getMenus:", error);
        return { sts: false, msg: "Error al ejecutar la consulta" };
      }
    }

    async createPermissionMenu(params) {
      try {
        // Validar que existan todos los datos obligatorios
        const { fk_id_profile, fk_id_menu, menu, id_module } = params;  
        console.log(params);
         
        
        if (!fk_id_profile || !fk_id_menu || !menu || !id_module) {
          return { sts: false, msg: "Faltan datos obligatorios" };
        }
        
        // Insertar el menu en la tabla security.menu
        const methodResult = await database.executeQuery("security", "createPermissionMenu", [
          fk_id_profile,
          fk_id_menu
        ]);
        if (!methodResult) {
          console.error("No se pudo crear el metodo");
          return { sts: false, msg: "No se pudo crear el metodo" };
        }

        sc.addMenuPermission({
          id_profile: fk_id_profile,
          menu: menu,
          fk_id_module: id_module
        });

        return { sts: true, msg: "Metodo creado exitosamente" };
      } catch (error) {
        console.error("Error en createMethod:", error);
        return { sts: false, msg: "Error al crear el metodo" };
      }
  }

  async updatePermissionMenu(params) {
    try {
      // Validar que existan todos los datos obligatorios
      const { id_permission_menu, fk_id_profile, fk_id_menu, old_fk_id_profile, menu, id_module } = params;
      console.log(params);
      
      
      if (!id_permission_menu || !fk_id_profile || !fk_id_menu || !old_fk_id_profile || !menu || !id_module) {  
        return { sts: false, msg: "Faltan datos obligatorios" };
      }
      
      const methodResult = await database.executeQuery("security", "updatePermissionMenu", [
        fk_id_profile,
        fk_id_menu,
        id_permission_menu
      ]);
      if (!methodResult) {
        console.error("No se pudo actualizar el metodo");
        return { sts: false, msg: "No se pudo actualizar el metodo" };
      }

      sc.updateMenuPermission(
        { id_profile: old_fk_id_profile, menu: menu, fk_id_module: id_module },
        { fk_id_profile, object: menu, id_module }
      );

      return { sts: true, msg: "Metodo actualizado exitosamente" };
    } catch (error) {
      console.error("Error en updateMethod:", error);
      return { sts: false, msg: "Error al actualizar el metodo" };
    }
  }

  async deletePermissionMenus(params) {
    try {
      // Se espera un arreglo de objetos { id_permission_menu, id_module }
      const { permissions } = params;
  
      if (!permissions || !Array.isArray(permissions) || permissions.length === 0) {
        return { sts: false, msg: "Faltan datos obligatorios o formato incorrecto" };
      }
      
      // Extraer únicamente los id_permission_menu para el query de eliminación
      const permissionIds = permissions.map(p => p.id_permission_menu);
      
      // 1. Obtener los permisos de menú a eliminar (para removerlos del mapa de seguridad)
      const allPermissionsResult = await database.executeQuery("security", "getPermissionMenus", []);
      let permissionsToRemove = [];
      if (allPermissionsResult && allPermissionsResult.rows) {
        permissionsToRemove = allPermissionsResult.rows.filter(row =>
          permissions.some(p => 
            p.id_permission_menu === row.id_permission_menu && 
            p.id_module === row.id_module
          )
        );
      }
      
      // 2. Ejecutar la eliminación en la base de datos pasando solo los IDs
      const deleteResult = await database.executeQuery("security", "deletePermissionMenus", [permissionIds]);
    
      if (!deleteResult) {
        console.error("No se pudieron eliminar los permisos de menú");
        return { sts: false, msg: "No se pudieron eliminar los permisos de menú" };
      }
      
      // 3. Remover cada permiso del mapa de seguridad usando removeMenuPermission
      permissionsToRemove.forEach(permission => {
        sc.removeMenuPermission({
          id_profile: permission.fk_id_profile,
          object: "MenuBO", // Ajusta si es necesario
          menu: permission.menu,
          id_module: permission.id_module
        });
      });
    
      return { sts: true, msg: "Permisos de menú eliminados exitosamente" };
    } catch (error) {
      console.error("Error en deletePermissionMenus:", error);
      return { sts: false, msg: "Error al eliminar los permisos de menú" };
    }
  }
}

module.exports = MenuBO;