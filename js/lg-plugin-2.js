/*! For license information please see lg-plugin-2.js.LICENSE.txt */
(self.webpackChunksakurairo_scripts=self.webpackChunksakurairo_scripts||[]).push([[846],{2508:function(e,l,n){n.r(l);var t=function(){return t=Object.assign||function(e){for(var l,n=1,t=arguments.length;n<t;n++)for(var c in l=arguments[n])Object.prototype.hasOwnProperty.call(l,c)&&(e[c]=l[c]);return e},t.apply(this,arguments)},c={fullScreen:!0},r=function(){function e(e,l){return this.core=e,this.$LG=l,this.settings=t(t({},c),this.core.settings),this}return e.prototype.init=function(){var e="";if(this.settings.fullScreen){if(!(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled))return;e='<button type="button" aria-label="Toggle fullscreen" class="lg-fullscreen lg-icon"></button>',this.core.$toolbar.append(e),this.fullScreen()}},e.prototype.isFullScreen=function(){return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement},e.prototype.requestFullscreen=function(){var e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.msRequestFullscreen?e.msRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen&&e.webkitRequestFullscreen()},e.prototype.exitFullscreen=function(){document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()},e.prototype.fullScreen=function(){var e=this;this.$LG(document).on("fullscreenchange.lg.global"+this.core.lgId+" \n            webkitfullscreenchange.lg.global"+this.core.lgId+" \n            mozfullscreenchange.lg.global"+this.core.lgId+" \n            MSFullscreenChange.lg.global"+this.core.lgId,(function(){e.core.lgOpened&&e.core.outer.toggleClass("lg-fullscreen-on")})),this.core.outer.find(".lg-fullscreen").first().on("click.lg",(function(){e.isFullScreen()?e.exitFullscreen():e.requestFullscreen()}))},e.prototype.closeGallery=function(){this.isFullScreen()&&this.exitFullscreen()},e.prototype.destroy=function(){this.$LG(document).off("fullscreenchange.lg.global"+this.core.lgId+" \n            webkitfullscreenchange.lg.global"+this.core.lgId+" \n            mozfullscreenchange.lg.global"+this.core.lgId+" \n            MSFullscreenChange.lg.global"+this.core.lgId)},e}();l.default=r}}]);
//# sourceMappingURL=lg-plugin-2.js.map