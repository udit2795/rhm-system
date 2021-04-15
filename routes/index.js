const router = require('express').Router();

const RhmSystemController = require('../controller/controller').RhmSystemController

router.get('/', RhmSystemController.getHouseList);
router.get('/data', RhmSystemController.getHouseList);
router.get('/booking/:id', RhmSystemController.getSlots);
router.post('/booking', RhmSystemController.bookSlots);
router.post('/addOwner', RhmSystemController.addOwner);
router.post('/addRealtor', RhmSystemController.addRealtor);
router.post('/addHouse', RhmSystemController.addHouse);
router.post('/add_house_visibility_slot', RhmSystemController.addHouseVisibilitySlot);


module.exports = router;
