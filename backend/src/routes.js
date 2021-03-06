const express = require('express');
const {celebrate , Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/incidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Login
routes.post('/sessions' ,SessionController.create)  ;


//Listagem da aplicacao
routes.get('/ongs' ,OngController.index);


//Cadrasto das ogns
routes.post('/ongs' , celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}) , OngController.create);


routes.get('/profile' ,celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}),ProfileController.index);

// metodos dos Incident(delete , criacao e listagem) 
routes.post('/incidents' , IncidentController.create);

routes.get('/incidents' , celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}) ,IncidentController.index);

routes.delete('/incidents/:id' ,  celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })

}),IncidentController.delete);

module.exports = routes ;