
LibCanvas.Interfaces.Bindable = new Class({
	binds : {},
	autoBinds : {},
	autoBind : function (event, args) {
		if ($type(args) != 'function') {
			this.autoBinds[event] = args;
			this.bind(event, args);
		}
		return this;
	},
	callBind : function (event, fn, args) {
		var result = fn.apply(this, args);
		if (typeof result == 'string') {
			result = result.toLowerCase();
			if (result == 'unbind') {
				this.unbind(event, fn);
			}
		}
	},
	bind : function (event, fn) {
		if ($type(event) == 'array') {
			event.each(function (e) {
				this.bind(e, fn);
			}.bind(this));
			return this;
		}
		if ($type(fn) == 'function') {
			if (!(event in this.binds)) {
				this.binds[event] = [];
			}
			this.binds[event]
				.include(fn);
			if (event in this.autoBinds) {
				this.callBind(event, fn, this.autoBinds[event]);
			}
		} else if (event in this.binds) {
			var args = fn;
			this.binds[event].each(function (fn) {
				this.callBind(event, fn, args);
			}.bind(this));
		}
		return this;
	},
	unbind : function (event, fn) {
		if ($type(event) == 'array') {
			event.each(function (e) {
				this.unbind(e, fn);
			}.bind(this));
			return this;
		}

		if (!fn) {
			this.binds[event] = [];
		} else if (event in this.binds) {
			this.binds[event].erase(fn);
		}
		return this;
	}
});