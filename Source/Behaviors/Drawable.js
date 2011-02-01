/*
---

name: "Behaviors.Drawable"

description: "Abstract class for drawable canvas objects"

license: "[GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)"

authors:
	- "Shock <shocksilien@gmail.com>"

requires:
	- LibCanvas

provides: Behaviors.Drawable

...
*/

LibCanvas.namespace('Behaviors').Drawable = atom.Class({
	Implements: [atom.Class.Events],
	setLibcanvas : function (libcanvas) {
		this.libcanvas = libcanvas;
		this.readyEvent('libcanvasSet');
		this.libcanvas.addEvent('ready', this.readyEvent.bind(this, 'libcanvasReady'));
		return this;
	},
	getCoords : function () {
		return this.shape.getCoords();
	},
	getShape : function () {
		return this.shape;
	},
	setShape : function (shape) {
		this.shape = shape;
		return this;
	},
	getZIndex : function () {
		return this.zIndex || 0;
	},
	setZIndex : function (zIndex) {
		this.zIndex = zIndex;
		return this;
	},
	draw : atom.Class.abstractMethod
});