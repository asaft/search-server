import express from 'express';
import { StreetsController } from '../controllers/streets.controller';
import { ElasticsearchService } from '../services/elasticsearch.service';
import { IElasticSearchService } from '../interfaces/ielasticesearch';

const router = express.Router();
const service:IElasticSearchService = new ElasticsearchService()

const streetsController = new StreetsController(service);

router.get('/', streetsController.get.bind(streetsController));
router.post('/', streetsController.post);

export default router;