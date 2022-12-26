convertMp3ToWav = function (input) {
	let segments = input.split('/');

	let filename = segments[segments.length - 1];
	let extension = filename.split('.')[1];

	let name = filename.split('.')[0];

	let folder = input.replace(filename, '');
	let output = folder + name + '.wav';
	console.log("\Converting file %s", output)

	var ffmpeg = require('fluent-ffmpeg');
	var command = ffmpeg(input)
		.inputFormat('mp3')
		.audioCodec('pcm_s16le')
		.format('wav')
		.save(output)

	return output;
}

convertWavToMp3 = function (input) {
	let segments = input.split('/');
  console.log(segments);

	let filename = segments[segments.length - 1];
  console.log(filename);
	let extension = filename.split('.')[1];
  console.log(extension);
	let name = filename.split('.')[0];
  console.log(name);
	let folder = input.replace(filename, '');
  console.log("Folder:");
  console.log(folder);
	let output = folder + name + '.mp3';
	console.log("\Converting file %s", output)

	//var ffmpeg = require('ffmpeg-static');;
	var command = ffmpeg(input)
		.inputFormat('wav')
		.audioCodec('libmp3lame')
		.format('mp3')
		.save(output)

	return output;
}

convertAudio = function (input) {
	let segments = input.split('/');
  console.log(segments);

	let filename = segments[segments.length - 1];
  console.log(filename);
	let extension = filename.split('.')[1];
  console.log(extension);
	let name = filename.split('.')[0];
  console.log(name);
	let folder = input.replace(filename, '');
  console.log("Folder:");
  console.log(folder);
  if(extension == 'wav')
    {
      let output = folder + name + '.mp3';
      console.log("\Converting file %s", output)

      var command = ffmpeg(input)
        .inputFormat('wav')
        .audioCodec('libmp3lame')
        .format('mp3')
        .save(output)
      return output;
    }
  else if(extension == 'mp3')
    {
      let output = folder + name + '.wav';
    	console.log("\Converting file %s", output)

    	var command = ffmpeg(input)
    		.inputFormat('mp3')
    		.audioCodec('pcm_s16le')
    		.format('wav')
    		.save(output)
      return output;
    }
}


convertFiles = function (path, options) {
	return new Promise((resolve, reject) => {

		// Load modules
		const fs = require('fs');

		// Is argument a file?
		if (fs.statSync(path).isFile()) {

			// mp3
			if (path.endsWith(options.from)) {
				let result = convertMp3ToWav(path, options);
				console.log(result);
				resolve()
			}

		}

		console.log('\nCrawling directory \'%s\'', path);

		// Search for all audio files in folder
		fs.readdir(path, (err, files) => {

			let readFolderActions = [];

			// Process all found files
			if (files) {
				files.forEach(file => {
					let filePath = path + '/' + file;
					let readItem = null;

					// is folder
					if (fs.statSync(filePath).isDirectory()) {
						readItem = convertFiles(filePath, options);
					}
					// Not folder
					else {
						// is PDF
						if (file.endsWith(options.from)) {
							convertMp3ToWav(filePath, options);
						}
					}

					readFolderActions.push(readItem);
				});
			} else {
				reject('Directorio %s not found.', path);
			}

			// Wait for all actions to be processed
			Promise.all(readFolderActions).then((results) => {
				resolve();
			})
		})
	});
}


document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("dragover", e => {
		e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
	});

	["dragleave", "dragend"].forEach(type => {
		dropZoneElement.addEventListener(type, e=> {
			dropZoneElement.classList.remove('drop-zone--over');
			});
		});

		dropZoneElement.addEventListener("drop", e => {
			e.preventDefault();

			if (e.dataTransfer.files.length) {
				inputElement.files = e.dataTransfer.files;
        console.log(inputElement.files)
				console.log(e.dataTransfer.files[0].path);
        console.log(e.dataTransfer.files.length);
        let audiofiles = e.dataTransfer.files;
        //console.log(e.dataTransfer.files[1].path);
        //convertAudio(e.dataTransfer.files[0].path)

        for(i=0;i < e.dataTransfer.files.length;i++)
          {
          console.log("Converting "+e.dataTransfer.files[i].path);
          convertAudio(e.dataTransfer.files[i].path);
          }

				//updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
			}
	    //console.log(e);
		});

});

function updateThumbnail(dropZoneElement, file) {
	console.log(dropZoneElement);
	console.log(file);
	//console.log(file.type);
	//convertMp3ToWav(file);
}
