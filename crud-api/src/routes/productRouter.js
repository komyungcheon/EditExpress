import{Router} from 'express';
import productController from "../controllers/productController.js";
const productRouter = Router();

productRouter.get('', productController.findAll);
productRouter.post('/add', productController.add);
productRouter.get('/add', productController.showAddForm);
productRouter.get('/edit/:id', productController.showFormEdit);
productRouter.post('/edit/:id', productController.edit);
productRouter.get('/delete/:id', productController.delete);


export default productRouter;
