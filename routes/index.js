const router = require('express').Router();

const controller = require('../controller/controller');

router.get('/', controller.getHouseList);
router.get('/data', controller.getHouseList);
router.get('/booking/:id', controller.getSlots);
router.post('/booking', controller.bookSlots);
router.post('/addOwner', controller.addOwner);
router.post('/addRealtor', controller.addRealtor);
router.post('/addHouse', controller.addHouse);
router.post('/add_house_visibility_slot', controller.addHouseVisibilitySlot);


module.exports = router;
