var files = null;
var images = null;
var id = null;
var out = null;
var color = "#000000"
var imageUploadButton = $(".image-upload-button")
var resetFile = $(".reset-file")
var imageCollage = $(".image-collage")
var imageSave = $(".image-save")
var chosenFiles = $(".chosen-files")
var colorSelectButton = $(".color-select-button")
var generateCollage = $(".generate-collage")

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
	resetFile.hide()
}

function writeFileError(err){
	chosenFiles.empty()
	chosenFiles.append($("<p></p>").text(err).css("color", "red"))
}


function getDataURLs(files) {
	var urls = []
	var reader = new FileReader()
	for(var i = 0; i < files.length; i++){
		urls.push(reader.readAsDataURL(files[i]))
	}
	return urls;
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
		images = getDataURLs(files)
		console.log(images)	
	} else {
		writeFileError("Please upload files before generating a collage.")
	}
	
})

initializeSession()
console.log("Main function run")