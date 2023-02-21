const { validationResult } = require("express-validator");

//exporto la funcion validateFiels, es un middleware, por tanto tiene la req, res y next
exports.validateFields = (req, res, next) => {
    
    
// Creo una constante errors y en ella almaceno un arreglo de todas la validaciones que se hayan hecho, de todos errores obtenidos:
const errors = validationResult(req);//En la req vienen los errores

//¿Cómo valido si hay errores? Si errors esta no esta vacio implica que hay errores:
if(!errors.isEmpty()){

//Por lo tanto voy a retornar los errors:
return res.status(400).json({
    status: 'errors', 
    errors: errors.mapped(),//Debo mapear los errores para que aparezcan en forma de lista
});
}
next();
};
//Recordar: esta funcion captura los errores que vengan del check 
           // Si existe algun error envia los errores

           //Obs.: al no ser una funcion asicrona no lleva try y catch