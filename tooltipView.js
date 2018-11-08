var box = document.getElementById('box');

var boxModel = box.getBoundingClientRect();

var arrowHeight = 4;
var arrowWidth = 8;
var boxWidth = boxModel.right - boxModel.left;
var boxHeight = boxModel.bottom - boxModel.top;
var offsetTop = boxModel.top;
var offsetRight = boxModel.right;
var offsetLeft = boxModel.left;
var offsetBottom = boxModel.bottom;
var viewPortHeight = window.innerHeight;
var viewPortWidth = window.innerWidth;

console.log('boxHeight: ' + boxHeight);
console.log('boxWidth: ' + boxWidth);

console.log('offsetTop: ' + offsetTop);
console.log('offsetBottom: ' + offsetBottom);

console.log('offsetLeft: ' + offsetLeft);
console.log('offsetRight: ' + offsetRight);

console.log('viewPortHeight: ' + viewPortHeight);
console.log('viewPortWidth: ' + viewPortWidth);

var topLeft = offsetTop - arrowHeight - boxHeight


// function setPosition(){
//     if(offsetTop)
// }

function init(id, text){
    var target = document.getElementById(id);

    if(!target) throw console.error('fuck you, no such element');

    var tooltipBox = document.createElement('div');
    var tooltipSpan = document.createElement('span');
    var tooltipSpanText = document.createTextNode(text);
    var tooltipArrow = document.createElement('div');
    tooltipBox.classList.add('tooltip-box');
    tooltipArrow.classList.add('tooltip-arrow');
    tooltipSpan.appendChild(tooltipSpanText);
    tooltipBox.appendChild(tooltipSpan);
    document.body.appendChild(tooltipBox);
    document.body.appendChild(tooltipArrow);
    

    var _targetRect = target.getBoundingClientRect();
    var _tootipBoxRect = tooltipBox.getBoundingClientRect();

    var _arrowSize = 4;

    var _targetRectWidth = _targetRect.right - _targetRect.left;
    var _targetRectHeight = _targetRect.bottom - _targetRect.top;
    var _tooltipBoxRectWidth = _tootipBoxRect.right - _tootipBoxRect.left;
    var _tooltipBoxRectHeight = _tootipBoxRect.bottom - _tootipBoxRect.top;

    var _viewPortHeight = window.innerHeight;
    var _viewPortWidth = window.innerWidth;

    var _targetTopSpace =  _targetRect.top - _arrowSize - _tooltipBoxRectHeight;
    var _targetBottomSpace = _viewPortHeight - _targetRect.bottom - _arrowSize - _tooltipBoxRectHeight;
    var _targetLeftSpace = _targetRect.left - _arrowSize - _tooltipBoxRectWidth;
    var _targetRightSpace = _viewPortWidth - _targetRect.right - _arrowSize - _tooltipBoxRectWidth;

    if(_targetBottomSpace > 0){

        tooltipBox.style.top = (_targetRect.bottom + 8) + 'px';
        tooltipBox.style.left = _targetRect.left + 'px';
        tooltipArrow.style.top = _targetRect.bottom + 'px';
        tooltipArrow.style.left = (_targetRect.left + _targetRectWidth / 2 - 8) + 'px';
    }

    var x = 0;
    
}

init('box', 'I am a tooltip');