var PhoneMask = function(elements, settings) {
    var that = this;
    settings = settings || {};
    this.elements = elements;
    this.patternChar = settings.patternChar || '_';
    this.pattern = settings.pattern || '+7 (___) ___-__-__';
    this.prefix = settings.prefix || '+7 ';
    this.backspaceCode = settings.backspaceCode || 8;
    this.allowedKeysRegExp = settings.allowedKeysRegExp || /^\d$/;
    this.igrogingKeys = settings.igrogingKeys || [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93];

    var inputKeyEvent = function(e) {
        e = e || window.event;
        var elem = e.target || e.srcElement;
        var result = true;
        if (!that.isIgnoredKey(e.keyCode)) {
            if (e.keyCode != that.backspaceCode) {
                var char = String.fromCharCode(e.keyCode);
                if (char.match(that.allowedKeysRegExp) != null) {
                    elem.value = that.replaceToChar(elem, char);
                }
            } else {
                elem.value = that.replaceToPatternChar(elem);
            }
            
            result = false;
        }
        // select first pattern symbol
        that.selectFirstPatterntChar(elem);
        if (result == false) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            return result;
        }
    };

    var inputFocusEvent = function(e) {
        e = e || window.event;
        var elem = e.target || e.srcElement;
        
        var start = elem.value.indexOf(that.patternChar);
        var end = start + 1;
        if (start < 0) {
            start = elem.value.length - 1;
            end = start + 1;
        }
        that.selectCharInInput(elem, start, end);
    }

    this.elements.forEach(function(item, i, arr){
        item.value =  that.pattern;
        item.onkeydown = inputKeyEvent;
        item.onfocus = inputFocusEvent;
    });
}

PhoneMask.prototype.selectFirstPatterntChar = function(elem) {
    var start = elem.value.indexOf(this.patternChar);
    if (start > -1) {
        var end = start + 1;
        this.selectCharInInput(elem, start, end);
    }
}

PhoneMask.prototype.isIgnoredKey = function(code) {
    if (this.igrogingKeys.indexOf(code) < 0) {
        return false;
    }
    return true;
};

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

PhoneMask.prototype.replaceAt = function(str, index, character)  {
    var tempArr = str.split("");
    tempArr[index] = character;
    return tempArr.join("");
};

PhoneMask.prototype.replaceToChar = function(elem, char) {
    var value = elem.value;
    var firstCharToReplace = value.indexOf(this.patternChar);
    if (firstCharToReplace > -1) {
        return this.replaceAt(value, firstCharToReplace, char);
    }
    return value;
};

PhoneMask.prototype.replaceToPatternChar = function(elem) {
    var value = elem.value;
    var firstPatternCharPos = value.indexOf(this.patternChar);
    var replaceCharPos;
    var isFindPos = false;
    if (firstPatternCharPos == -1) {
        replaceCharPos = value.length - 1;
        isFindPos = true;
    } else {
        replaceCharPos = firstPatternCharPos - 1;
        while (!isFindPos) {
            if (this.pattern[replaceCharPos] != value[replaceCharPos]) {
                isFindPos = true;
            } else {
                replaceCharPos--;
                if (replaceCharPos < 0) {
                    break;
                }
            }
        }
    }
    if (isFindPos && replaceCharPos > this.prefix.length) {
        return this.replaceAt(value, replaceCharPos, this.patternChar);
    }
    return value;
};
