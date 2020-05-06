var files = null;
var images = null;
var urls = null;
var id = null;
var out = null;
var gap = 10;
var previewRatio = 3;
var color = "#000000"
var imageUploadButton = $(".image-upload-button")
var resetFile = $(".reset-file")
var imageCollage = $(".image-collage")
var imageCollageBox = document.querySelector(".image-collage-box")
var imageSave = $(".image-save")
var chosenFiles = $(".chosen-files")
var colorSelectButton = $(".color-select-button")
var generateCollage = $(".generate-collage")
var canvas = document.querySelector(".image-collage-canvas")
var newCollage = $(".new-collage")
var ctx = canvas.getContext("2d")
var nativeWidth = window.innerWidth;
var nativeHeight = window.innerHeight;

function generateId(len) {
	var final = ""
	var sel = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
	for(var i = 0; i < len; i++){
		final += sel[Math.floor(Math.random() * sel.length)];
	}
	return final;
}

function setOutPath(id) {
	return "./cdn/collage-" + id
}

function initializeSession() {
	id = generateId(len=9)
	out = setOutPath(id)
	resetFile.css({"display": "none"})
	imageCollageBox.style.display = "none";
	console.log("Session initialized")
}

function diagnostics(){
	console.log("ID: " + id)
	console.log("Current files selected: " + files)
	console.log("Out file: " + out + ".png")
}

function writeChosenFiles(files){
	for(var i = 0; i < files.length; i++){
		chosenFiles.append($("<p></p>").text("Image " + (i+1) + ": " + files[i].name).attr("class", "image-text-" + i))
	}

}

function areFiles(files){
	for(var i = 0; i < files.length; i++){
		if(files[i].type === "" || !files[i].type.match("image.*")) return false;
	}
	return true;
}

function resetSelection(){
	chosenFiles.empty()
	imageUploadButton.val('')
	files = null;
	urls = null;
	images = null;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	imageCollage.attr('src', '')
	imageCollage.css('height', 0)
	imageCollage.css('width', 0)
	document.querySelector(".color-select-button").value = "#000000";
	imageCollageBox.style.display = "none";
	resetFile.hide()
}

function writeFileError(err){
	chosenFiles.empty()
	chosenFiles.append($("<p></p>").text(err).css("color", "red"))
}

function getDataURLs(files) {
	var urls = []
	for(var i = 0; i < files.length; i++){
		urls.push(URL.createObjectURL(files[i]))	
	}
	return urls;
}

function getImages(urls) {
	var imgs = []
	for(var i = 0; i < urls.length; i++){
		img = document.createElement('img')
		img.id = 'image-' + i
		img.src = urls[i]
		img.style.display = "none"

		imgs.push(imageCollageBox.appendChild(img))
		// imgs.push(imageCollageBox.append($("<img style='display: none;'>").attr('id', 'image-'+i).attr('src', urls[i])))
	}
	return imgs;
}

function shapeImageMap(imgLen) {
	base = Math.round(Math.sqrt(imgLen))
	extra = imgLen-base*base
	imgMap = []
	imgMap.length = base;
	for(var i = 0; i < base; i++) {
		row = []
		row.length = base;
		imgMap[i] = row;
	}

	if(extra !== 0) {
		if(extra > 0) {
			row = []
			row.length = extra;
			imgMap.push(row)		
		} else {
			imgMap[imgMap.length-1].length = imgMap[imgMap.length-1].length-Math.abs(extra);
		}

	}
	return imgMap;
}

function fillImageMap(imgs, imgMap) {
	imgIndex = 0;
	for(var i = 0; i < imgMap.length; i++) {
		for(var j = 0; j < imgMap[i].length; j++) {
			imgMap[i][j] = imgs[imgIndex];
			imgIndex++;
		}
	}

	return imgMap;
}

function generateImageMap(imgs) {
	return fillImageMap(imgs, shapeImageMap(imgs.length))
}

function getCanvasDimensions(imgMap) {
	var width = 0;
	var height = 0;
	var xgap = 0;
	var ygap = imgMap.length+1;
	var widths = [];
	var heights = [];
	var tempWidth = 0;
	var xgaps = [];
	var ygaps = [];
	var numxGaps = 0;
	var numYGaps = 0;

	for(var i = 0; i < imgMap.length; i++) {

		for(var j = 0; j < imgMap[i].length; j++) {
			heights.push(imgMap[i][j].height)
			tempWidth += imgMap[i][j].width;
		}

		xgaps.push(imgMap[i].length+1)

		widths.push(tempWidth);
		tempWidth = 0;

		height += max(heights);
		heights = [];
	}
	xgap = max(xgaps)
	xgaps = [];
	width = max(widths);
	widths = [];

	return [width+(xgap*gap), height+(ygap*gap)];
}

function max(arr) {
	var maximum = -Infinity;
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] > maximum) maximum = arr[i];
	}
	return maximum;
}

function setupCanvas(width, height, color){
	canvas.width = width;
	canvas.height = height;
	ctx.fillStyle = color;
	ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawImages(imgMap) {
	var xpt = gap;
	var ypt = gap;
	var ypts = [];

	for(var i = 0; i < imgMap.length; i++) {
		for(var j = 0; j < imgMap[i].length; j++) {
			ctx.drawImage(imgMap[i][j], dx=xpt, dy=ypt)
			// gap = calculateGap(imgMap[i][j])
			xpt += imgMap[i][j].width + gap
			ypts.push(imgMap[i][j].height)
		}
		ypt += max(ypts) + gap
		xpt = gap
	}
}

function drawImageCollage(images, clr){
	imgMap = generateImageMap(images)
	dimensions = getCanvasDimensions(imgMap)
	setupCanvas(dimensions[0], dimensions[1], clr)
	drawImages(imgMap)
}

function pipeCanvasToImage() {
	var aspRatio = canvas.width/canvas.height;

	var url = canvas.toDataURL("image/png", 1.0)
	imageCollage.css('width', nativeWidth/previewRatio);
	imageCollage.css('height', nativeWidth/(previewRatio*aspRatio));
	imageCollage.attr('src', url)
}

function downloadImage() {
	var url = imageCollage.attr('src')
    var downloader = document.createElement('a');
    downloader.download = 'collage.png';
    downloader.href = url;
    document.body.appendChild(downloader);
    downloader.click()
    downloader.remove()
}

imageUploadButton.click(function(){
	resetSelection()
})

imageUploadButton.change(function(){
	resetFile.css("display", "block")
	files = document.querySelector(".image-upload-button").files
	if(areFiles(files)){
		writeChosenFiles(files)
	} else {
		resetSelection()
		writeFileError("Please upload either .png, .jpg, or .jpeg files.")
	}
	
})

resetFile.click(function(){
	resetSelection()
})

colorSelectButton.change(function(){
	color = colorSelectButton.val()
})

generateCollage.click(function(){
	if(files) {
		imageCollageBox.style.display = "flex";
		urls = getDataURLs(files)
		images = getImages(urls)
		for(var i = 0; i < images.length; i++) {
			images[images.length-1].addEventListener('load', function(){
				drawImageCollage(images, color)
				pipeCanvasToImage()
			})
		}
	} else {
		writeFileError("Please upload files before generating a collage.")
	}
	
})

imageSave.click(function(){
	downloadImage()
})

newCollage.click(function(){
	resetSelection()
})

initializeSession()
console.log("Main function run")