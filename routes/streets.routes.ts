import express from 'express';
import { StreetsController } from '../controllers/streets.controller';
import { ElasticsearchService } from '../services/elasticsearch.service';
import { IElasticSearchService } from '../interfaces/ielasticesearch';
import { StreetService } from '../services/street.service';

const router = express.Router();
const service:IElasticSearchService = new ElasticsearchService()

const streetsService:StreetService = new StreetService(service)
const streetsController = new StreetsController(streetsService);

router.get('/getById', streetsController.getById.bind(streetsController));
router.get('/', streetsController.get.bind(streetsController));
router.post('/', streetsController.post);

export default router;