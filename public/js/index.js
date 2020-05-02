files = null;
id = null;
out = null;
imageUploadButton = $(".image-upload-button")
resetFile = $(".reset-file")
imageCollage = $(".image-collage")
imageSave = $(".image-save")
chosenFiles = $(".chosen-files")


function generateId(len) {
	id = ""
	sel = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
	for(var i = 0; i < len; i++){
		id += sel[Math.floor(Math.random() * sel.length)];
	}
	return id;
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
		chosenFiles.append($("<p></p>").text(files[i].name).attr("class", "image-" + i))
	}

}

function resetSelection(){
	chosenFiles.empty()
}

imageUploadButton.change(function(){
	resetFile.css("display", "block")
	resetSelection()
	writeChosenFiles(document.querySelector(".image-upload-button").files)
})

initializeSession()
console.log("Main function run")