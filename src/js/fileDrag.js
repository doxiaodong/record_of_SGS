(function() {

	// getElementById
	function $id(id) {
		return document.getElementById(id);
	}
	// output information
	function Output(msg) {
		var m = $id("messages");
	//	show all files you have dropped in
	//	m.innerHTML = msg + m.innerHTML;

	//	clear the latest file and only one file can be display even if you have dropped in more than two files
		m.innerHTML = msg;
	}


	// file drag hover
	function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}


	// file selection
	function FileSelectHandler(e) {
		

		// cancel event and hover styling
		FileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			ParseFile(f);
		}
	}


	// output file information
	function ParseFile(file) {
		// display an image
		if (file.type.indexOf("image") == 0) {
			var reader = new FileReader();
			reader.onload = function(e) {
				Output(
					"<p><strong>" + file.name + ":</strong><br />" +
					'<img src="' + e.target.result + '" /></p>'
				);
			}
			reader.readAsDataURL(file);
		}

		// display text
		if (file.type.indexOf("text") == 0) {
			var reader = new FileReader();
			reader.onload = function(e) {
				Output(
					"<p><strong>" + file.name + ":</strong></p><br /><pre>" +
//					e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
					e.target.result +
					"</pre>"
				);
			}
			reader.readAsText(file);
		}
	}


	// initialize
	function Init() {

		var file_select = $id("file-select"),
			file_drag   = $id("file-drag"),
			body        = $id("body");

		// file select
		file_select.addEventListener("change", FileSelectHandler, false);

		// is XHR2 available?
		var xhr = new XMLHttpRequest();		//use for later website
		if (xhr.upload) {

			// file drop
//			file_drag.addEventListener("dragover", FileDragHover, false);
//			file_drag.addEventListener("dragleave", FileDragHover, false);
//			file_drag.addEventListener("drop", FileSelectHandler, false);

			body.addEventListener("dragover", FileDragHover, false);
			body.addEventListener("dragleave", FileDragHover, false);
			body.addEventListener("drop", FileSelectHandler, false);
		}
	}

	// call initialization file
	if (window.File && window.FileList && window.FileReader) {
		Init();
	}
})();