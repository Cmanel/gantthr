import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import { controllerHandler } from '../lib/controller-utils';

import {
  addSubtask,
  getAllSubtasks,
  getSubtask,
  getDelicesSucresFromDB,
} from './subtasks';


const router = Router();
// router.use()
/*router.get(
  '/delice-sucre/:format/:deliceId',
  controllerHandler(getDeliceSucre, HttpStatus.OK, (req, res, next) => [req.params.deliceId, req.params.format])
);
router.get(
  '/delices-sucres',
  controllerHandler(getDelicesSucres, HttpStatus.OK, (req, res, next) => [])
);

router.get(
  '/db/delices-sucres',
  controllerHandler(getDelicesSucresFromDB, HttpStatus.OK, (req, res, next) => [])
);

router.get(
  '/delice-sale/:deliceId',
  controllerHandler(getDeliceSale, HttpStatus.OK, (req, res, next) => [req.params.deliceId])
);
router.get(
  '/delices-sales',
  controllerHandler(getDelicesSales, HttpStatus.OK, (req, res, next) => [])
);

router.get(
  '/epicerie-fine/:itemId',
  controllerHandler(getItemEpicerieFine, HttpStatus.OK, (req, res, next) => [req.params.itemId])
);
*/
router.get('/', (req, res, next) => {
  console.log('ca marche');
  res.send(200);
});

//getAllSubasks

router.get(
  '/allSubtasks',
  controllerHandler(getAllSubtasks, HttpStatus.OK, (req, res, next) => [])
);

//getSubtask
router.get(
  '/subtask/:id',
  controllerHandler(getSubtask, HttpStatus.OK, (req, res, next) => [req.params.id])
);

//addSubtask
router.post('/addSubtask', 
  
  controllerHandler(addSubtask, HttpStatus.OK, (req, res, next) => [req.body])
  
);

//updateTask

//deleteTask





export default router;
