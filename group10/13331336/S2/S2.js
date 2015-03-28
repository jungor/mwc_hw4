window.onload = function() {
    adders = getAdders();
    getsum = document.getElementById('api');
    atplus = document.getElementById('atplus');
    atplus.addEventListener('mouseout', reset);
    for (var i = adders.length-1; i >= 0; i--) {
        adders[i].addEventListener('click', getNum);
    }
    getsum.addEventListener('click', function(){
        adders[0].click();
    });
};

var reset = function(e) {
    if (!e) {
        e = window.event;
    }
    var target = e.relatedTarget ? e.relatedTarget : e.toElement;
    while (target && target != this) {
        target = target.parentNode;
    }
    if (target != this) {
        for (var i = adders.length - 1; i >= 0; i--) {
            adders[i].children[0].classList.remove('show');
            adders[i].children[0].innerHTML = '...';
            sum.innerHTML = '';
            enable(adders);
        }
    }
};

var getAdders = function() {
    var result = [];
    result.push(document.getElementById('A'));
    result.push(document.getElementById('B'));
    result.push(document.getElementById('C'));
    result.push(document.getElementById('D'));
    result.push(document.getElementById('E'));
    return result;
};

var getNum = function(){
    var that = this;
    var other = [];
    for (var i = adders.length-1; i >= 0; i--) {
        if (adders[i].id !== this.id) {
            other.push(adders[i]);
        }
    }
    disable(other);
    var num = this.children[0];
    num.classList.add('show')
    var xml;
    if (window.XMLHttpRequest) {
        xml = new XMLHttpRequest();
    } else {
        xml = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xml.open("get", "http://127.0.0.1:3000/", true);
    xml.onreadystatechange = function() {
        if (xml.readyState === 4) {
            num.innerHTML = xml.responseText;
            enable(other);
            disable(that);
            for (var i = 0; i < adders.length; i++) {
                if (adders[i].classList.contains('enable')) {
                    adders[i].click();
                    break;
                }
            }
            if (isAllGetNum()) {
                sum.addEventListener('click', getSum);
                sum.click();
            }
        }
    }
    xml.send();
};

var getSum = function() {
    var sum = 0;
    for (var i = adders.length - 1; i >= 0; i--) {
        sum += parseInt(adders[i].children[0].innerHTML);
    }
    document.getElementById('inner').innerHTML = sum;
};

var disable = function(other) {
    if (other instanceof Array) {
        for (var i = other.length - 1; i >= 0; i--) {
            other[i].removeEventListener('click', getNum);
            other[i].classList.remove('enable');
            other[i].classList.add('disable');
        }
    } else {
        other.removeEventListener('click', getNum);
        other.classList.remove('enable');
        other.classList.add('disable');
    }
};

var enable = function(other) {
    if (other instanceof Array) {
        for (var i = other.length - 1; i >= 0; i--) {
            if (other[i].children[0].innerHTML === '...') {
                other[i].addEventListener('click', getNum);
                other[i].classList.remove('disable');
                other[i].classList.add('enable');
            }
        }
    } else {
        other.addEventListener('click', getNum);
        other.classList.remove('disable');
        other.classList.add('enable');
    }

};

var isAllGetNum = function() {
    return (adders[0].children[0].innerHTML !== '...'
        && adders[1].children[0].innerHTML !== '...'
        && adders[2].children[0].innerHTML !== '...'
        && adders[3].children[0].innerHTML !== '...'
        && adders[4].children[0].innerHTML !== '...');
};