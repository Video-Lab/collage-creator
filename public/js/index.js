files = null;
id = null;
out = null;
color = "#000000"
imageUploadButton = $(".image-upload-button")
resetFile = $(".reset-file")
imageCollage = $(".image-collage")
imageSave = $(".image-save")
chosenFiles = $(".chosen-files")
colorSelectButton = $(".color-select-button")


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
		chosenFiles.append($("<p></p>").text("Image " + (i+1) + ": " + files[i].name).attr("class", "image-" + i))
	}

}

function resetSelection(){
	chosenFiles.empty()
	imageUploadButton.val('')
	files = null;
	resetFile.hide()
}

// function areFiles(files){
// 	types = ["image/png", "image/jpg", "image/jpeg"]
// 	for(var i = 0; i < files.length; i++){
// 		for(var j = 0; j < types.length; j++){
// 			isImage = false;
// 			console.log(files[i].type + " " + types[j])
// 			if(files[i].type === types[j]) isImage = true;
// 			if(!isImage) return false;
// 		}
// 	}
// 	return true;
// }

function writeFileError(err){
	chosenFiles.append($("<p></p>").text(err).css("color", "red"))
}

imageUploadButton.click(function(){
	resetSelection()
})

imageUploadButton.change(function(){
	resetFile.css("display", "block")
	files = document.querySelector(".image-upload-button").files
	writeChoseFiles(files)
	// if(areFiles(files)){
	// 	writeChosenFiles(files)	
	// } else {
	// 	resetSelection()
	// 	writeFileError("Please upload either .png, .jpg, or .jpeg files.")
	// }
	
})

resetFile.click(function(){
	resetSelection()
})

colorSelectButton.change(function(){
	color = colorSelectButton.val()
})

initializeSession()
console.log("Main function run")