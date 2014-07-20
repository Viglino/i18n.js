/** Copyright (c) 2014 by Jean-Marc.Viglino [at] ign.fr
* Licensed under the Beerware license (http://en.wikipedia.org/wiki/Beerware), 
* feel free to use and abuse it in your projects (the code, not the beer ;-). 
* Source code on Github : https://github.com/Viglino/i18n.js
*/
/** Internationalization object
Initialization : 
	i18n.add({	
	fr:{	toto: "fr {1} {2} {3}",
			test: "Une page de test.",
			info: "Information"
		},
	 en:{	toto: "en {1} 2} {3}" ,
			test: "A test page." 
		}
	});

Translation :
	_T("test");					// => "Une page de test."
	_T("toto",1);				// => "fr 1 {1} {2}"
	_T("toto",[10,2,"test"]);	// => "fr 10 2 test"
	_T("info");					// => "Information"
	_T("titi");					// => "titi"
	i18n.setLang("en");
	_T("test");					// => "A test page."
	_T("toto",[10,2,"test"]);	// => "en 10 2 test"
	_T("info");					// => "Information"

Use with jQuery
	<p data-i18n="info"></p>
=> After calling : setLang("en");
	<p data-i18n="info">A test page.</p>

*/
var i18n = (function()
{	// Active language
	var lang = "";
	// Internationalization data
	var data = {};
	
	// Easy translation function
	if (!window._T) window._T = function(k,t) { return i18n.T(k,t); }

	// Internationalization object
	return {
		// Add new values 
		add: function(t)
		{	var k,l;
			if (typeof t == "object") 
			{	for (k in t) if (typeof t[k] == "object")
				{	if (!data[k]) data[k] = {};
					for (l in t[k]) data[k][l] = t[k][l]; 
				}
			}
			//$.extend (data, t);
		},
		
		// Translation
		T: function(k,t)
		{	if (!k) return;
			var m = data[lang];
			if (!m || !m[k]) for (var l in data) { m = data[l]; break; }
			if (!m || !m[k]) return k;
			if (!t) return m[k];
			if (!(t instanceof Array)) t = [t];
			return m[k].replace(/\{(\d+)\}/g, 
				function (m, n) 
				{	if (typeof t[n-1] == "undefined") return m;
					return t[n-1]; 
				});
		},
		
		// Setup the language
		setLang: function(l)
		{	if (!l) for (l in data) { break; }
			lang = l; 
			// Translate the data content
			$("[data-i18n]").each(function()
			{	var $this = $(this);
				$this.html(i18n.T($this.attr("data-i18n")));
			});
			return lang;
		},
		
		// Get the current language
		getLang: function() { return lang; }
		
	};
})();
