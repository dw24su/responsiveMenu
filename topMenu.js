$(function(){
	var createMenu = function(event){

		// @event.data.reducedWidth
		// @event.data.maxMenuWidth

		var	$_self = $("#topMenu");
		var $_list = $_self.children("li:not(.bar)");
		var $_bar  = $_self.find(".bar");
		var $_sub  = $_self.find(".sub");
		var _enableBar = $_bar.length > 0 ? 1 : 0;
		var _transElements = $_self.hasClass("transfered") ? 1 : 0;

		var $fn_createBar = function(){

			$_self.append(
				$("<li/>").addClass("bar").append(
					$("<a/>").attr("href", "#")
				).append(
					$("<ul/>").addClass("sub")
				)
			);

			$_bar = $_self.find(".bar");
			$_sub = $_bar.find(".sub");

			return _enableBar++;
		};

		var $fn_elementsCopy = function(toggle){

			if(toggle === false){
				$_self.addClass("transfered").find("li").each(function(i){
					var $_this = $(this);
					if(!$_this.hasClass("bar")){
						$_sub.append($_this.clone());
						$_this.remove();
					}
				});

				return _transElements++;

			}else{
				$_sub.children("li").each(function(i){
					var $_this = $(this);
					if(!$_this.hasClass("bar")){
						$_self.append($_this.clone());
						$_this.remove();
					}
				});
				$_self.removeClass("transfered");
				$_bar.remove();

				return _transElements--;
			}
		};

		if(document.body.clientWidth <= event.data.reducedWidth){
			!_enableBar && $fn_createBar();
			!_transElements && $fn_elementsCopy(false);
		}else{
			if(_transElements){
				$fn_elementsCopy(true);
			}

			if($_self.outerWidth() > event.data.maxMenuWidth){
				for (var i = $_list.length - 1; i >= 0; i--) {
					var $_this = $_list.eq(i);
					if($_self.outerWidth() <= event.data.maxMenuWidth){
						break;
					}else{
						!_enableBar && $fn_createBar();
						$_sub.prepend($_this.clone());
						$_this.remove();
					}
				};
			}
		}
	};

	var openMenu = function(event){
		$(this).toggleClass("active");
		event.preventDefault();
	};

	$(window).on("ready resize", {
		reducedWidth: 1000,
		maxMenuWidth: 650
	}, createMenu);

	$(document).on("click", "#topMenu .bar", openMenu);

});
