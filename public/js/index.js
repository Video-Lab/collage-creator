var files = null;
var images = null;
var urls = null;
var id = null;
var out = null;
var gap = 10;
var faces = ["top", "right", "left", "right"]
var faceFunctionMap = {"top": topFace, "right": rightFace, "left": leftFace, "right": rightFace}
var corners = ["topRight", "topLeft", "bottomRight", "bottomLeft"]
var cornerFunctionMap = {"topRight": topRightCorner, "topLeft": topLeftCorner, "bottomRight": bottomRightCorner, "bottomLeft": bottomLeftCorner}
var color = "#000000"
var imageUploadButton = $(".image-upload-button")
var resetFile = $(".reset-file")
var imageCollage = $(".image-collage")
var imageCollageBox = document.querySelector(".image-collage-box")
var imageSave = $(".image-save")
var chosenFiles = $(".chosen-files")
var colorSelectButton = $(".color-select-button")
var generateCollage = $(".generate-collage")
var c = document.querySelector(".image-collage-canvas")
var ctx = c.getContext("2d")

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
	imageCollage.css({"opacity": "0"})
	imageSave.css({"display": "none"})
	console.log("Session initialized")
}

function diagnostics(){
	console.log("ID: " + id)
	console.log("Current files selected: " + files)
	console.log("Out file: " + out + ".png")
}

function writeChosenFiles(files){
	for(var i = 0; i < files.length; i++){
		chosenFiles.append($("<p></p>").text("Image " + (i+1) + ": " + files[i].name).attr("class", "image-" + i))
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

function topLeftCorner(img, x=0, y=0) {
	return [x,y]
}

function topRightCorner(img, x=0, y=0) {
	return [x+img.width, y]
}

function bottomLeftCorner(img, x=0, y=0) {
	return [x, y+img.height]
}

function bottomRightCorner(img, x=0, y=0) {
	return [x+img.width, y+img.height]
}

function center(img, x=0, y=0) {
	return [x+(Math.floor(img.width/2)),y+(Math.floor(img.height/2))]
}

function topFace(img, y=0) {
	return y;
}

function bottomFace(img, y=0) {
	return y+img.height;
}

function leftFace(img, x=0) {
	return x;
}

function rightFace(img, x=0) {
	return x+img.width;
}

function shapeImageMap(imgLen) {
	// base = Math.floor(Math.sqrt(imgLen))
	// extraBase = base
	// if((imgLen - base*base) % 2 != 0 && base % 2 == 0) extraBase++; 
	// extraRows = Math.ceil((imgLen - base*base) / extraBase)
	// imgMap = []
	// imgMap.length = base
	// console.log(base)
	// console.log(extraBase)
	// for(var i = 0; i < base; i++){
	// 	imgRow = []
	// 	imgRow.length = base;
	// 	imgMap[i] = imgRow
	// }

	// exImgMap = []
	// exImgMap.length = extraRows
	// for(var i = 0; i < exImgMap.length; i++){
	// 	imgRow = []
	// 	imgRow.length = extraBase
	// 	imgMap[i] = imgRow
	// }

	// if(exImgMap) imgMap = imgMap.concat(exImgMap);

	// return imgMap;

// 	base = Math.ceil(Math.sqrt(imgLen))
// 	extra = base*base - imgLen
// 	imgMap = []
// 	imgMap.length = base;
// 	for(var i = 0; i < base; i++) {
// 		row = []
// 		row.length = base;
// 		imgMap[i] = row;
// 	}

// 	if(extra !== 0) {
// 		// if(extra % 2 !== 0 && base % 2 === 0) imgMap[base-1].length = imgMap[base-1].length + 1;
// 		imgMap[base-1].length = extra;		
// 	}

// 	return imgMap;

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
	for(var i = 0; i < imgMap.length-1; i++) {
		for(var j = 0; j < imgMap[i].length; j++) {
			imgMap[i][j] = imgs[imgIndex];
			imgIndex++;
		}
	}

	if(imgMap[0].length % 2 === 0) {

	}

}

function generateImageMap(imgs) {

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
		urls = getDataURLs(files)
		images = getImages(urls)
		console.log(images)	
	} else {
		writeFileError("Please upload files before generating a collage.")
	}
	
})

initializeSession()
console.log("Main function run")