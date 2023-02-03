/**
 * @param {string} input
 * @param {string} selectedFormat
 * @returns
 */
const convertAudio = function (input, selectedFormat) {
	let segments = input.split('/');
	let filename = segments[segments.length - 1];
	let extension = filename.split('.')[1];
	let name = filename.split('.')[0];
	let folder = input.replace(filename, '');

	console.log(bvalue);
	console.log(svalue);

	let output = folder + name + '_conv' + '.' + selectedFormat;
	console.log("\Converting file %s", output)

	if (selectedFormat == 'mp3') {
		var command = ffmpeg(input)
			.inputFormat(extension)
			.audioCodec('libmp3lame')
			.format(selectedFormat)
			.audioBitrate(bvalue)
			.audioFrequency(svalue)
			.save(output)
		return output;
	} else if (selectedFormat == 'wav' && bvalue != 8) {
		var command = ffmpeg(input)
			.inputFormat(extension)
			.audioCodec('pcm_s' + bvalue + 'le')
			.format(selectedFormat)
			.audioBitrate(bvalue)
			.audioFrequency(svalue)
			.save(output)
		return output;
	} else if (selectedFormat == 'wav' && bvalue == 8) {
		var command = ffmpeg(input)
			.inputFormat(extension)
			.audioCodec('pcm_u' + bvalue)
			.audioBitrate(bvalue)
			.audioFrequency(svalue)
			.format(selectedFormat)
			.save(output)
		return output;
	} else if (selectedFormat == 'raw') {
		let output = folder + name + '_conv' + selectedFormat;
		var command = ffmpeg(input)
			.inputFormat(extension)
			.audioCodec('pcm_s16le')
			.audioBitrate(bvalue)
			.audioFrequency(svalue)
			.format(selectedFormat)
			.save(output)
		return output;
	} else if (selectedFormat == 'aiff') {
		let output = folder + name + '_conv' + '.' + selectedFormat;
		var command = ffmpeg(input)
			.inputFormat(extension)
			.audioCodec('pcm_s' + bvalue + 'be')
			.audioBitrate(bvalue)
			.audioFrequency(svalue)
			.format(selectedFormat)
			.save(output)
		return output;
	} else if (selectedFormat == 'ogg') {
		let output = folder + name + '_conv' + '.' + selectedFormat;
		var command = ffmpeg(input)
			.inputFormat(extension)
			.audioCodec('libvorbis')
			.audioBitrate(bvalue)
			.audioFrequency(svalue)
			.format(selectedFormat)
			.save(output)
		return output;
	} else if (selectedFormat == 'flac') {
		let output = folder + name + '_conv' + '.' + selectedFormat;
		var command = ffmpeg(input)
			.inputFormat(extension)
			.audioCodec('libflac')
			.audioBitrate(bvalue)
			.audioFrequency(svalue)
			.format(selectedFormat)
			.save(output)
		return output;
	} else if (selectedFormat == 'aac') {
		let output = folder + name + '_conv' + '.' + selectedFormat;
		var command = ffmpeg(input)
			.inputFormat(extension)
			.audioCodec('libfaac')
			.audioBitrate(bvalue)
			.audioFrequency(svalue)
			.format(selectedFormat)
			.save(output)
		return output;
	} else if (selectedFormat == 'ac3') {
		let output = folder + name + '_conv' + '.' + 'mp3';
		var command = ffmpeg(input)
			.inputFormat(extension)
			.audioCodec('ac3')
			.audioBitrate(bvalue)
			.audioFrequency(svalue)
			.format(selectedFormat)
			.save(output)
		return output;
	}
}

document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
	const dropZoneElement = inputElement.closest(".drop-zone");

	dropZoneElement.addEventListener("dragover", e => {
		e.preventDefault();
		dropZoneElement.classList.add("drop-zone--over");
	});

	["dragleave", "dragend"].forEach(type => {
		dropZoneElement.addEventListener(type, e => {
			dropZoneElement.classList.remove('drop-zone--over');
			dropZoneElement.classList.add("drop-zone");
		});
	});

	dropZoneElement.addEventListener("drop", e => {
		e.preventDefault();
		dropZoneElement.classList.remove('drop-zone--over');
		dropZoneElement.classList.add("drop-zone");

		if (e.dataTransfer.files.length) {
			inputElement.files = e.dataTransfer.files;
			console.log(inputElement.files)
			console.log(e.dataTransfer.files[0].path);
			console.log(e.dataTransfer.files.length);
			let audiofiles = e.dataTransfer.files;
			//console.log(e.dataTransfer.files[1].path);
			//convertAudio(e.dataTransfer.files[0].path)

			for (i = 0; i < e.dataTransfer.files.length; i++) {
				console.log("Converting " + e.dataTransfer.files[i].path);
				convertAudio(e.dataTransfer.files[i].path, format);
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



//FORMAT SELECTION
var format = "wav";

var button = document.getElementsByClassName("button");

var addSelectClass = function () {
	removeSelectClass();
	this.classList.add('selected');
}

var removeSelectClass = function () {
	for (var i = 0; i < button.length; i++) {
		button[i].classList.remove('selected')
	}
}

var updateSelection = function () {
	console.log("selected.");
	console.log(button[0]);
	if (this.innerText === "WAV") {
		format = "wav";
		bvalue = 16;
		svalue = 44100;
		console.log(format);
		bitr.innerHTML = '<option value="16">16-bit</option><option value="24">24-bit</option><option value="32">32-bit</option><option value="8">8-bit</option>'
		sampler.style.display = "block";
		sampler.innerHTML = '<option value="44100">44100 kHz</option><option value="48000">48000 kHz</option><option value="22050">22050 kHz</option><option value="16000">16000 kHz</option><option value="11025">11025 kHz</option><option value="8000">8000 kHz</option><option value="88200">88200 kHz</option><option value="96000">96000 kHz</option><option value="192000">192000 kHz</option>'
	} else if (this.innerText === "MP3") {
		format = "mp3";
		bvalue = 96;
		console.log(format);
		bitr.innerHTML = '<option value="96k">96 kbps</option><option value="128k">128 kbps</option><option value="256k">256 kbps</option><option value="320k">320 kbps</option>'
		sampler.style.display = "none";
	} else if (this.innerText === "AIFF") {
		format = "aiff";
		bvalue = 16;
		svalue = 44100;
		console.log(format);
		bitr.innerHTML = '<option value="16">16-bit</option><option value="24">24-bit</option><option value="32">32-bit</option>'
		sampler.style.display = "block";
		sampler.innerHTML = '<option value="44100">44100 kHz</option><option value="48000">48000 kHz</option><option value="22050">22050 kHz</option><option value="16000">16000 kHz</option><option value="11025">11025 kHz</option><option value="8000">8000 kHz</option><option value="88200">88200 kHz</option><option value="96000">96000 kHz</option><option value="192000">192000 kHz</option>'
	} else if (this.innerText === "OGG") {
		format = "ogg";
		bvalue = 96;
		console.log(format);
		bitr.innerHTML = '<option value="96k">96 kbps</option><option value="128k">128 kbps</option><option value="256k">256 kbps</option><option value="320k">320 kbps</option>'
		sampler.style.display = "none";
	} else if (this.innerText === "FLAC") {
		format = "flac";
		bvalue = 16;
		svalue = 44100;
		console.log(format);
		sampler.style.display = "block";
		bitr.innerHTML = '<option value="16">16-bit</option><option value="24">24-bit</option><option value="32">32-bit</option><option value="8">8-bit</option>'
		sampler.innerHTML = '<option value="44100">44100 kHz</option><option value="48000">48000 kHz</option><option value="22050">22050 kHz</option><option value="16000">16000 kHz</option><option value="11025">11025 kHz</option><option value="8000">8000 kHz</option><option value="88200">88200 kHz</option><option value="96000">96000 kHz</option><option value="192000">192000 kHz</option>'
	} else if (this.innerText === "RAW") {
		format = "raw";
		bvalue = 16;
		svalue = 44100;
		console.log(format);
		bitr.innerHTML = '<option value="16">16-bit</option><option value="24">24-bit</option><option value="32">32-bit</option><option value="8">8-bit</option>'
		sampler.style.display = "block";
		sampler.innerHTML = '<option value="44100">44100 kHz</option><option value="48000">48000 kHz</option><option value="22050">22050 kHz</option><option value="16000">16000 kHz</option><option value="11025">11025 kHz</option><option value="8000">8000 kHz</option><option value="88200">88200 kHz</option><option value="96000">96000 kHz</option><option value="192000">192000 kHz</option>'
	} else if (this.innerText === "AAC") {
		format = "aac";
		bvalue = 16;
		svalue = 44100;
		console.log(format);
		bitr.innerHTML = '<option value="16">16-bit</option><option value="24">24-bit</option><option value="32">32-bit</option><option value="8">8-bit</option>'
		sampler.style.display = "block";
		sampler.innerHTML = '<option value="44100">44100 kHz</option><option value="48000">48000 kHz</option><option value="22050">22050 kHz</option><option value="16000">16000 kHz</option><option value="11025">11025 kHz</option><option value="8000">8000 kHz</option><option value="88200">88200 kHz</option><option value="96000">96000 kHz</option><option value="192000">192000 kHz</option>'
	} else if (this.innerText === "AC3") {
		format = "ac3";
		bvalue = 96;
		console.log(format);
		bitr.innerHTML = '<option value="96k">96 kbps</option><option value="128k">128 kbps</option><option value="256k">256 kbps</option><option value="320k">320 kbps</option>'
		sampler.style.display = "none";
	}

	//button[0].innerText
}

for (var i = 0; i < button.length; i++) {
	button[i].addEventListener("click", addSelectClass);
	button[i].addEventListener("click", updateSelection);
}

//QUALITY SELECTION
var bitr = document.getElementById("bitrates");
var bvalue = bitr.value;
var btext = bitr.options[bitr.selectedIndex].text;

var sampler = document.getElementById("samplerates");
var svalue = sampler.value;
var stext = sampler.options[sampler.selectedIndex].text;

function bitChange() {
	bvalue = bitr.value;
	btext = bitr.options[bitr.selectedIndex].text;
	console.log(bvalue, btext);
}

function rateChange() {
	svalue = sampler.value;
	stext = sampler.options[sampler.selectedIndex].text;
	console.log(svalue, stext);
}

bitr.onchange = bitChange;
sampler.onchange = rateChange;
