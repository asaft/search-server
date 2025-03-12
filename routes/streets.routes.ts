import express from 'express';
import { StreetsController } from '../controllers/streets.controller';
import { ElasticsearchService } from '../services/elasticsearch.service';
import { IElasticSearchService } from '../interfaces/ielasticesearch';
import { StreetService } from '../services/street.service';

const router = express.Router();
const service:IElasticSearchService = new ElasticsearchService()

const streetsService:StreetService = new StreetService(service)
const streetsController = new StreetsController(streetsService);

router.get('/getByQuery', streetsController.getByQuery.bind(streetsController));
router.get('/getByMainName', streetsController.getByMainName.bind(streetsController));
router.get('/getById/:id', streetsController.getById.bind(streetsController));
router.get('/', streetsController.get.bind(streetsController));
router.delete('/delete/:id',streetsController.delete.bind(streetsController))
router.post('/', streetsController.post);

export default router;