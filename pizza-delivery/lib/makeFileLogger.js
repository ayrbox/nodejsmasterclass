var fs = require("fs");
var path = require("path");
var zlib = require("zlib");

// Compress the contents of one .log file into a .gz.b64 file within the same directory
const compressLog = function(logFilePath, archiveFilePath, callback) {
  // Read the source file
  fs.readFile(logFilePath, "utf8", function(errReadingLog, logContent) {
    if (errReadingLog || !logContent) {
      callback(new Error("Error reading log"));
      return;
    }

    // Compress the data using gzip
    zlib.gzip(logContent, function(errorCompressing, buffer) {
      if (errorCompressing || !buffer) {
        callback(new Error("Error compressing file."));
        return;
      }

      // Send the data to the destination file
      fs.open(archiveFilePath, "wx", function(
        errorCreatingArchive,
        fileDescriptor
      ) {
        if (errorCreatingArchive || !fileDescriptor) {
          callback(new Error("Unable to create archive file."));
          return;
        }

        // Write to the destination file
        fs.writeFile(fileDescriptor, buffer.toString("base64"), function(
          errorWritingArchive
        ) {
          if (errorWritingArchive) {
            callback(new Error("Error writing to archive file."));
            return;
          }

          // Close the destination file
          fs.close(fileDescriptor, function(errorClosing) {
            if (errorClosing) {
              callback(errorClosing);
              return;
            }
            callback(false);
          });
        });
      });
    });
  });
};

// Decompress the contents of a .gz file into a string variable
const decompressArchive = function(archiveFilePath, callback) {
  fs.readFile(archiveFilePath, "utf8", function(err, str) {
    if (err || !str) {
      callback(new Error("Unable to read archive file."));
      return;
    }

    // Inflate the data
    var inputBuffer = Buffer.from(str, "base64");
    zlib.unzip(inputBuffer, function(errorOnUzip, outputBuffer) {
      if (errorOnUzip || !outputBuffer) {
        callback(new Error("Unble to uncompress archive file."));
        return;
      }

      var uncompressedString = outputBuffer.toString();
      callback(false, uncompressedString);
    });
  });
};

// Truncate a log file
const truncateLog = function(filePath, callback) {
  fs.truncate(filePath, 0, function(err) {
    if (err) {
      callback(err);
      return;
    }

    callback(false);
  });
};

// Export the module
const makeFileLogger = function(logPath, logFile) {
  const logFilePath = path.join(logPath, `${logFile}.log`);

  return {
    log: function(str, callback) {
      fs.open(logFilePath, "a", function(err, fileDescriptor) {
        if (err || !fileDescriptor) {
          callback(new Error("Unable to append to file."));
          return;
        }

        fs.appendFile(fileDescriptor, str + "\n", function(err) {
          if (!err) {
            fs.close(fileDescriptor, function(err) {
              if (!err) {
                callback(false);
              } else {
                callback(new "Error closing file that was being appended"());
              }
            });
          } else {
            callback(new Error("Error appending to file"));
          }
        });
      });
    },

    readLog: function(callback) {
      fs.readFile(logFilePath, "utf8", function(err, logContent) {
        if (err || !str) {
          callback(new Error("Unable to read log file."));
          return;
        }
        callback(false, logContent);
      });
    },

    archive: function(callback) {
      const archiveLogPath = path.join(
        logPath,
        logFile,
        `${Date.now()}.gz.b64`
      );
      compressLog(logFilePath, archiveLogPath, function(errCompress) {
        if (errCompress) {
          callback(new Error("Error compressing log file."));
          return;
        }

        truncateLog(logFilePath, function(errTruncating) {
          if (errTruncating) {
            callback(new Error("Error truncating log file"));
            return;
          }
          callback(false);
        });
      });
    },

    // List all the logs, and optionally include the compressed logs
    getArchivedFiles: function(callback) {
      const archiveFolder = path.join(logPath, logFile);
      fs.readdir(archiveFolder, function(errorListing, fileNames) {
        if (errorListing || !data || data.length === 0) {
          callback(new Error("Unable to read archive."));
          return;
        }
        callback(false, fileNames);
      });
    },

    readArchiveFile: function(archiveFile, callback) {
      const archiveFilePath = path.join(logPath, logFile, archiveFile);
      decompressArchive(archiveFilePath, callback);
    }
  };
};

module.exports = makeFileLogger;
