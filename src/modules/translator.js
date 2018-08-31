// TODO: use react-intl
const messages = {
    "error.already.exists": "Ya existe un registro con estos datos",
    "error.invalid.data":"Los datos no son válidos. Por favor, revise y vuelva a intentarlo",
    "error.person.parent.of.children":"Esta persona es padre de otras ",
    "error.item.not.found":"No se encuentra el identificador a borrar: ",
    "error.location.parent.of.children": "Esta Zona está asociada a varias personas: ",
    "no.data.message":"Puede intentarlo de nuevo o añadir nuevos elementos usando los controles superiores",
    "no.data.title":"No hay datos que mostrar",
    "no.data.subtitle":"",
    "father":"Padre",
    "mother":"Madre",
    "name":"Nombre",
    "surnames":"Apellidos",
    "location":"Zona",
    "ok": "Aceptar",
    "cancel": "Cancelar",
    "Input payload validation failed": "Falta algún campo requerido",
    "Failed to fetch":"No se puede conectar con el servidor",
    "Internal Server Error": "Ooops, esto se ha roto. Estamos en ello... "
}

export function translate(id) {
    return messages[id] || '';
}