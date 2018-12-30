/**
 * Library for storing and editing data */


const fs = require('fs'); const path = require('path');

// Base directory for data folder
const BASE_DIR = path.join(__dirname, '../.data/');



const dataLib = {
  create: (dir, file, data, callback) => {
    fs.open(path.join(BASE_DIR, dir, `${file}.json`), 'wx', (err, fileDescriptor) => {
      if (err && !fileDescriptor) {
        callback('Could not create new file, it may already exists');
      }

      const stringData = JSON.stringify(data);

      fs.writeFile(fileDescriptor, stringData, (err) => {
        if(err) {
          callback('Error writing to new file');
        }

        fs.close(fileDescriptor, (err) => {
          if (err) {
            callback('Error closing new file');
          }

          callback(false);
        });
      });
    });
  },
  read: (dir, file, callback) => {
    fs.readFile(path.join(BASE_DIR, dir, `${file}.json`), 'utf8', (err, data) => {
      callback(err, data);
    });
  },

  update: (dir, file, data, callback) => {
    // open 
    fs.open(path.join(BASE_DIR, dir, `${file}.json`), 'r+', (err, fileDescriptor) => {
      if(err) {
        callback('Could not open the file for updating');
      }

      // truncate file
      fs.truncate(fileDescriptor, err => {
        if (err) {
          callback('Error truncating file');
        }
      });

      const stringData = JSON.stringify(data);

      fs.writeFile(fileDescriptor, stringData, (err) => {
        if(err) {
          callback('Error writing to file');
        }

        fs.close(fileDescriptor, (err) => {
          if (err) {
            callback('Error closing file');
          }

          callback(false);
        });
      });
    });
  },
  delete: (dir, file, callback) => {
    // Unlink the file
    fs.unlink(path.join(BASE_DIR, dir, `${file}.json`), (err) => {
      if (err) {
        callback('Error deleting file');
      }

      callback(false);
    });
  }
};



module.exports = dataLib;

