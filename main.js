if(!myEx){
	var myEx = function(){
		var removeAD = function(){
			$(".ecom-ads-wrap").hide();
			$(".ui-reelList-viewport").css("bottom", "0");

			$("#toptip").hide();
		};
		 
		var setTitle = function(){
			$("title").text(
				$("#playTitle").find(".songname").text() + 
				" - " + 
				$("#timeWrap").text().replace(/\s/g, "")
				);
		};

		var genShortCuts = function(cmds){
			var shortCuts = {}, altShortCuts = {}, ctlShortCuts = {};
			if(cmds){
				shortCuts = cmds.cmds || {};
				altShortCuts = cmds.altCmds || {};
				ctlShortCuts = cmds.ctlCmds || {};
			}

			var attatchShortCuts = function(e){
				var cmd = e.keyCode.toString();
				shortCuts[cmd] && shortCuts[cmd]();

				if(e.altKey){
					altShortCuts[cmd] && altShortCuts[cmd]();
				}
				if(e.ctlKey){
					ctlShortCuts[cmd] && ctlShortCuts[cmd]();
				}
			};


			return {
				enable: function(){
					$("body").on("keyup", attatchShortCuts);
				},
				disable: function(){
					$("body").off("keyup", attatchShortCuts);
				}
			};
		};

		removeAD();
		setInterval(setTitle, 500);

		genShortCuts({
			altCmds: {
				// List - L
				"76": function(event){
					$("#playMode").find(".list-mode > a").click();
				},
				// Random - R
				"82": function(event){
					$("#playMode").find(".random-mode > a").click();
				},
				// Single - S
				"83": function(event){
					$("#playMode").find(".single-mode > a").click();
				}
			}
		}).enable();
	};
	myEx();
	console.log("myEx ok.");
}else{
	console.log("myEx already running.")
}