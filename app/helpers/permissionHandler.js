import {Permisos} from "../models/permisosRol.js"

const hasPermission = (nombrePermiso,nombreRol) =>
{
    try {
        if(!Permisos[nombreRol]) throw new Error('El rol no existe');
        return Permisos[nombreRol].includes(nombrePermiso);
    } catch (error) {
        return false;
    }
}

export {hasPermission}