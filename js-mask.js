var PhoneMask = function(elements, settings) {
    var that = this;
    settings = settings || {};
    this.elements = elements;
    this.patternChar = settings.patternChar || '_';
    this.prefix = settings.prefix || '';
    this.pattern = settings.pattern || '(___) ___-__-__';
    this.pattern = this.prefix + this.pattern;
    this.backspaceCode = settings.backspaceCode || 8;
    this.deleteCode = settings.deleteCode || 46;
    this.allowedRegExp = settings.allowedRegExp || /^\d$/;
    this.igrogeKeyCodes = settings.igrogeKeyCodes || [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93];

    var inputKeyEventPress = function(e) {
        e = e || window.event;
        var elem = e.target || e.srcElement;
        var result = true;
        console.log(e.keyCode);
        if (!that.isIgnoredKey(e.keyCode)) {
            if (e.keyCode != that.backspaceCode && e.keyCode != that.deleteCode) {
                var char = String.fromCharCode(e.keyCode);
                if (that.allowedRegExp == false || char.match(that.allowedRegExp) != null) {
                    elem.value = that.replaceToChar(elem, char);
                }
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

    var inputKeyEventDown = function(e) {
        e = e || window.event;
        var elem = e.target || e.srcElement;
        var result = true;
        if (!that.isIgnoredKey(e.keyCode)) {
            if (e.keyCode == that.backspaceCode) {
                elem.value = that.replaceToPatternChar(elem);
                result = false;
            }
            if (e.keyCode == that.deleteCode) {
                elem.value = that.replaceToPatternChar(elem);
                result = false;
            }
        }
        // select first pattern symbol
        that.selectFirstPatterntChar(elem);
        if (result === false) {
            return false;
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

    if (Object.prototype.toString.call(this.elements) === "[object NodeList]") {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].value =  that.pattern;
            this.elements[i].onkeydown = inputKeyEventDown;
            this.elements[i].onkeypress = inputKeyEventPress;
            this.elements[i].onfocus = inputFocusEvent;
        }
    } else if (this.elements != null) {
        this.elements.value =  that.pattern;
        this.elements.onkeydown = inputKeyEventDown;
        this.elements.onkeypress = inputKeyEventPress;
        this.elements.onfocus = inputFocusEvent;
    }
}

PhoneMask.prototype.selectFirstPatterntChar = function(elem) {
    var start = elem.value.indexOf(this.patternChar);
    if (start > -1) {
        var end = start + 1;
        this.selectCharInInput(elem, start, end);
    }
}

PhoneMask.prototype.isIgnoredKey = function(code) {
    if (this.igrogeKeyCodes.indexOf(code) < 0) {
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
    if (isFindPos && replaceCharPos >= this.prefix.length) {
        return this.replaceAt(value, replaceCharPos, this.patternChar);
    }
    return value;
};

PhoneMask.prototype.destroy = function() {
    if (Object.prototype.toString.call(this.elements) === "[object NodeList]") {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].value =  null;
            this.elements[i].onkeydown = null;
            this.elements[i].onkeypress = null;
            this.elements[i].onfocus = null;
        }
    } else if (this.elements != null) {
        this.elements.value =  null;
        this.elements.onkeydown = null;
        this.elements.onkeypress = null;
        this.elements.onfocus = null;
    }
};
