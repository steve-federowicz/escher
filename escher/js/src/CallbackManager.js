define(["utils"], function(utils) {
    /** CallbackManager()

     */

    var CallbackManager = utils.make_class();
    CallbackManager.prototype = { init: init,
				  set: set,
				  remove: remove,
				  run: run };

    return CallbackManager;

    function init() {

    }
    function set(name, fn) {
	/** As in d3 callbacks, you can namespace your callbacks after a period:
	 
	 select_metabolite.direction_arrow
	 select_metabolite.input

	 Both are called by select_metabolite
	 
	 */
	if (this.callbacks===undefined) this.callbacks = {};
	if (this.callbacks[name]===undefined) this.callbacks[name] = [];
	this.callbacks[name].push(fn);

	return this;
    }
    function remove(name) {
	/** Remove a callback by name
	 
	 */
	if (this.callbacks===undefined || Object.keys(this.callbacks).length==0) {
	    console.warn('No callbacks to remove');
	}
	delete this.callbacks[name];
	return this;
    }
    function run(name) {
	/** Run all callbacks that match the portion of name before the period ('.').

	 */
	if (this.callbacks===undefined) return this;
	// pass all but the first (name) argument to the callback
	var pass_args = Array.prototype.slice.call(arguments, 1);
	// look for matching callback names
	for (var a_name in this.callbacks) {
	    var split_name = a_name.split('.')[0];
	    if (split_name==name) {
		this.callbacks[a_name].forEach(function(fn) {
		    fn.apply(null, pass_args);
		});
	    }
	}
	return this;
    }
});
