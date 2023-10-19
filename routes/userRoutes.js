const express = require('express');
const user_routes = express();

const bodyParser = require('body-parser');
user_routes.use(bodyParser.json());
user_routes.use(bodyParser.urlencoded({ extended: true }));

//
const multer = require("multer");
const path = require("path");

user_routes.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'), function (err, success) {

      if (err) {
        throw err
      }

    });
  },

  filename: function (req, file, cb) {

    const name = Date.now() + '-' + file.originalname;
    cb(null, name, function (error, success) {

      if (error) {
        throw error
      }

    });

  }
});

const upload = multer({ storage: storage });
//

const user_controller = require('../controllers/userControllers');

// Insert API::- POST

user_routes.post('/insertData', upload.single('images'), user_controller.insert_data);

// UPDATE API::-  PUT

user_routes.put('/updateData', upload.single('images'), user_controller.update_data);

// Delete API::- DELETE

user_routes.delete('/deleteData/:id', user_controller.delete_data);

// Get Single Data

user_routes.get('/getData/:id', user_controller.get_data);

// Get All Data::

user_routes.get('/getAllData', user_controller.get_all_data);

// Get Particular image based on imagename

user_routes.get('/getImages/:images', user_controller.get_image);

// Get Particular image by taking id as parameter

user_routes.get('/getMyImages/:id', user_controller.get_image_by_id);

module.exports = user_routes;

