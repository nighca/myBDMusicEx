if(!myEx){
	var useMyEx = function(){
		var genInfoMgr = function(){
			var infoBox = $('<div id="myEx-info-box"></div>');
			infoBox.css({
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				fontWeight: "bold",
				color: "rgba(30, 30, 30, 0.8)",
				backgroundColor: "rgba(250, 250, 250, 0.5)",
				fontSize: "60px",
				textAlign: "center",

				display: "none",
				zIndex: 200
			}).appendTo("body").css({
				lineHeight: infoBox.height() + "px"
			});

			var showInfo = function(info, delay){
				delay = delay || 500;
				if (["string", "number"].indexOf(typeof(info)) < 0) {
					info = JSON.stringify(info);
				};
				infoBox.text(info).fadeIn().delay(delay).fadeOut();
			};

			return {
				showInfo : showInfo
			};
		};
		var infoMgr = genInfoMgr();

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

		var fullScreenLrc = function(){
			var lrcBlock = $("#lrcWrap");
			var isEnabled = false;

			var enable = function(){
				if(!isEnabled){
					lrcBlock.css({
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(255, 255, 255, 1)",
						fontWeight: "bold",
						color: "#333",
						fontSize: "24px",
						lineHeight: "50px",

						zIndex: 100
					});
				}
				isEnabled = true;
			};

			var disable = function(){
				if(isEnabled){
					lrcBlock.css({
						position: "static",
						color: "#666",
						fontWeight: "normal",
						background: "none",
						fontSize: "12px",
						lineHeight: "28px"
					});
				}
				isEnabled = false;
			};

			var toggleable = function(){
				if(isEnabled){
					disable();
				}else{
					enable();
				}
			};

			return {
				enable: enable,
				disable: disable,
				toggleable: toggleable
			};
		};

		removeAD();
		setInterval(setTitle, 500);
		var lrcCtl = fullScreenLrc();

		genShortCuts({
			altCmds: {
				// List - 'L'
				"76": function(event){
					$("#playMode").find(".list-mode > a").click();
					infoMgr.showInfo("List");
				},
				// Random - 'R'
				"82": function(event){
					$("#playMode").find(".random-mode > a").click();
					infoMgr.showInfo("Random");
				},
				// Single - 'S'
				"83": function(event){
					$("#playMode").find(".single-mode > a").click();
					infoMgr.showInfo("Single");
				},
				// LRC FullScreen - '+'
				"187": function(event){
					lrcCtl.enable();
				},
				// cancel LRC FullScreen - '-'
				"189": function(event){
					lrcCtl.disable();
				}
			},
			cmds: {
				// cancel LRC FullScreen - 'ESC'
				"27": function(event){
					lrcCtl.toggleable();
				}
			}
		}).enable();

		return {
			showInfo: infoMgr.showInfo
		};
	};
	var myEx = useMyEx();
	myEx.showInfo("myEx ok.");
}else{
	myEx.showInfo("myEx already running.")
}