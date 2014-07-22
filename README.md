i18n.js
=======

A small Javascript library for internationalization

###Initialization : 
Load internationalization resource with i18n.add() function.
```javascript
i18n.add({	
fr:{
  toto: "fr {1} {2} {3}",
  test: "Une page de test.",
  info: "Information"
},
en:{
  toto: "en {1} 2} {3}" ,
  test: "A test page." 
}
});
```

###Translation :
Use the i18n.setLang("fr") to set the language.
Use the _T() (or i18n.T()) function to translate keywords.

If no translation is found in the selected language, the default language (the first in the table) is tested. If no translation is found, the key is returned.
```javascript
	_T("test");			// => "Une page de test."
	_T("toto",1);			// => "fr 1 {1} {2}"
	_T("toto",[10,2,"test"]);	// => "fr 10 2 test"
	_T("info");			// => "Information"
	_T("titi");			// => "titi"
	i18n.setLang("en");
	_T("test");			// => "A test page."
	_T("toto",[10,2,"test"]);	// => "en 10 2 test"
	_T("info");			// => "Information"
```

###Use pattern to format parametres 
Format string by replacing elements like {1} with parameters passed as array.
```javascript
i18n.add({	
fr:{
  test1: "TEST {1}",
  test2: "TEST {1} {2}/{3}",
}
});
_T("test1",10);	// => "TEST 10"
_T("test2",["test",10,2]);	// => "TEST test 10/2"
```
    
###Use with jQuery
Add data-i18n attribut to html tags :
```html
<p data-i18n="info"></p>
```
=> After calling : setLang("en");
```html
<p data-i18n="info">A test page.</p>
```

