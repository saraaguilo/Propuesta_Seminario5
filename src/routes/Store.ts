import express from 'express';
import controller from '../controllers/Store'; // Importa los controladores relacionados con la tienda
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema'; // Importa los esquemas relacionados con la tienda

const router = express.Router();

router.post('/', ValidateSchema(Schemas.store.create), controller.createStore);
router.get('/:storeId', controller.readStore);
router.get('/', controller.readAllStores);
router.put('/:storeId', ValidateSchema(Schemas.store.update), controller.updateStore);
router.delete('/:storeId', controller.deleteStore);

export = router;
