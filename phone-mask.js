var PhoneMask = function(elements, pattern, prefix, placeholder) {
	var that = this;
	this.patternChar = "x";
	this.elements = elements;
	this.pattern = pattern;
	this.prefix = prefix;
	this.placeholder = placeholder;
    this.backspaceCode = 8;
	// this.igrogingKeys = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93];

	var inputKeyEvent = function(e) {
		e = e || window.event;
		var source = e.target || e.srcElement;
        if (e.keyCode != that.backspaceCode) {
        	source.value = that.phoneMasker(source, e.keyCode);
        } else {
            console.log('back');
        }

        // select next pattern symbol
        // debugger;
        var start = source.value.indexOf(that.patternChar);
        if (start > -1) {
            var end = start + 1;
            that.selectCharInInput(source, start, end);
        }
        return false;
	};

    var inputFocusEvent = function(e) {
        e = e || window.event;
        var elem = e.target || e.srcElement;
        
        var start = elem.value.indexOf(that.patternChar);
        if (start < 0) {
            start = 0;
        }
        var end = start + 1;
        that.selectCharInInput(elem, start, end);
    }

	this.elements.forEach(function(item, i, arr){
        item.value =  that.pattern;
        item.onkeydown = inputKeyEvent;
		item.onfocus = inputFocusEvent;
	});
}

// PhoneMask.prototype.isIgnoredKey = function(code) {
// 	if (this.elements.indexOf(code) < 0) {
// 		return false;
// 	}
// 	return true;
// };

PhoneMask.prototype.selectCharInInput = function(elem, start, end)  {
    if (elem.setSelectionRange) {
        elem.focus();
        elem.setSelectionRange(start, end);
    } else {
        if (elem.createTextRange) {
            range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    }
};

PhoneMask.prototype.replaceAt = function(str , index , character)  {
    var tempArr = str.split("");
    tempArr[index] = character;
    return tempArr.join("");
};

PhoneMask.prototype.phoneMasker = function(elem, keyCode) {
    var value = elem.value;
    var char = String.fromCharCode(keyCode);
    var firstCharToReplace = value.indexOf(this.patternChar);
    if (firstCharToReplace > -1) {
        return this.replaceAt(value, firstCharToReplace, char);
    }
    return value;
    // return 
    // var patternChars = this.pattern.replace(/\W/g, '');
    // var output = this.pattern.split("");
    // var values = value.toString().replace(this.prefix, '').replace(/\W/g, "");
    // var charsValues = values.replace(/\W/g, '');
    // var index = 0;
    // var i;
    // var outputLength = output.length;

    // debugger;
    // for (i = 3; i < outputLength; i++) {
    // 	// Reached the end of input
    // 	if (index >= values.length) {
    // 		if (patternChars.length == charsValues.length) {
    // 		  return output.join("");
    // 		} else {
    // 		  break;
    // 		}
    // 	}
    // 	// Remaining chars in input
    // 	else{
    // 		if (output[i] === this.patternChar && values[index].match(/[0-9]/)) {
    // 			output[i] = values[index++];
    // 		} else if (output[i] === this.patternChar) {
    // 			return output.slice(0, i).join("");
    // 		}
    // 	}
    // }
    // var res = output.join("").substr(0, i);
    // res = this.setPlaceholders(res);
    // debugger;

    // return res;
};

PhoneMask.prototype.setPlaceholders = function(value) {
	// debugger;
	for (var i = 0; i < value.length; i++) {
    	if (value[i] == this.patternChar) {
    		value[i] = placeholder;
    	}
    }
    return value;
};

var el;
document.addEventListener("DOMContentLoaded", function(){
	el = new PhoneMask(document.querySelectorAll('#modalPhoneInput'), "+1 (xxx) xxx-xx-xx", "+1 ", '_');
	console.log(el);
});