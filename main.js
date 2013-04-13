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
					console.log(cmd);//---------------------------
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
			var enable = function(){
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
			};

			var disable = function(){
				lrcBlock.css({
					position: "static",
					color: "#666",
					fontWeight: "normal",
					background: "none",
					fontSize: "12px",
					lineHeight: "28px"
				});
			};

			return {
				enable: enable,
				disable: disable
			};
		};

		removeAD();
		setInterval(setTitle, 500);
		var lrcCtl = fullScreenLrc();

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
				},
				// LRC FullScreen - +
				"187": function(event){
					lrcCtl.enable();
				},
				// cancel LRC FullScreen - -
				"189": function(event){
					lrcCtl.disable();
				}
			}
		}).enable();
	};
	myEx();
	console.log("myEx ok.");
}else{
	console.log("myEx already running.")
}