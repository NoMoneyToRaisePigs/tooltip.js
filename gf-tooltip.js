var gfTooltipStyle = document.createElement('style');
gfTooltipStyle.innerHTML = '.tooltip-arrow,.tooltip-box{position:fixed;opacity:0;transition:opacity .3s ease-in-out}.tooltip-box{padding:10px;background-color:#ddd;box-sizing:border-box;box-shadow:0 2px 8px 0 #fff;border:1px solid #ddd;border-radius:3px;color:rgba(0,0,0,.7)}.tooltip-arrow{width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-bottom:8px solid #ddd}.tooltip-arrow.show,.tooltip-box.show{opacity:1}.tooltip-arrow.show-below{transform:rotateZ(0)}.tooltip-arrow.show-above{transform:rotateZ(180deg)}';;
document.getElementsByTagName('head')[0].appendChild(gfTooltipStyle);

function gf_tooltip(id, text){
    var target = document.getElementById(id);

    if(!target) throw console.error('shit! no such element with this id {' + id +'}.');

    var tooltipBox = document.createElement('div');
    var tooltipSpan = document.createElement('span');
    var tooltipSpanText = document.createTextNode(text);
    var tooltipArrow = document.createElement('div');
    tooltipBox.classList.add('tooltip-box');
    tooltipArrow.classList.add('tooltip-arrow');
    tooltipArrow.setAttribute('id',id + '-tooltip-arrow');
    tooltipSpan.appendChild(tooltipSpanText);
    tooltipBox.appendChild(tooltipSpan);


    var _targetRect;
    var _tootipBoxRect;

    var _arrowSize = 8;
    var _arrowMargin = 2;

    var _targetRectWidth;
    var _targetRectHeight;
    var _tooltipBoxRectWidth;
    var _tooltipBoxRectHeight;

    var _viewPortHeight;
    var _viewPortWidth;

    var _targetTopSpace;
    var _targetBottomSpace;
        var _targetTopAndBottomLeftSpace;
        var _targetTopAndBottomRightSpace;

    var _targetLeftSpace;
    var _targetRightSpace;
        var _targetLeftAndRightTopSpace;
        var _targetLeftAndRightBottomSpace;
    
    var _showTooltipBelow = true;
    
    target.onmouseenter = function(){
        console.log('enter');
        appendEelements();
        setCalculation();
        setTooltipPosition();
        showTooltip();
    }

    target.onmouseleave = function(){
        removeElements();
        console.log('mouse leave')
        tooltipBox.style.top = 'auto';
        tooltipBox.style.right = 'auto';
        tooltipBox.style.bottom = 'auto';
        tooltipBox.style.left = 'auto';

        tooltipArrow.style.top = 'auto';
        tooltipArrow.style.right = 'auto';
        tooltipArrow.style.bottom = 'auto';
        tooltipArrow.style.left = 'auto';

        tooltipArrow.classList.remove('show-below');
        tooltipArrow.classList.remove('show-above');
        tooltipBox.classList.toggle('show');
        tooltipArrow.classList.toggle('show');

    }

    function removeElements(){
        tooltipBox.remove();
        tooltipArrow.remove();
    }

    function appendEelements(){
        document.body.appendChild(tooltipBox);
        document.body.appendChild(tooltipArrow);
    }

    function setCalculation(){
        _targetRect = target.getBoundingClientRect();
        _tootipBoxRect = tooltipBox.getBoundingClientRect();

        _targetRectWidth = _targetRect.right - _targetRect.left;
        _targetRectHeight = _targetRect.bottom - _targetRect.top;
        _tooltipBoxRectWidth = _tootipBoxRect.right - _tootipBoxRect.left;
        _tooltipBoxRectHeight = _tootipBoxRect.bottom - _tootipBoxRect.top;
    
        _viewPortHeight = window.innerHeight;
        _viewPortWidth = window.innerWidth;
    
        _targetTopSpace =  _targetRect.top - _arrowSize - _tooltipBoxRectHeight;
        _targetBottomSpace = _viewPortHeight - _targetRect.bottom - _arrowSize - _tooltipBoxRectHeight;
            _targetTopAndBottomLeftSpace = _targetRect.left + _targetRectWidth / 2 - _tooltipBoxRectWidth / 2;
            _targetTopAndBottomRightSpace = (_viewPortWidth - _targetRect.right) + _targetRectWidth / 2 - _tooltipBoxRectWidth / 2;
    
        _targetLeftSpace = _targetRect.left - _arrowSize - _tooltipBoxRectWidth;
        _targetRightSpace = _viewPortWidth - _targetRect.right - _arrowSize - _tooltipBoxRectWidth;
            _targetLeftAndRightTopSpace = _targetRect.top + _targetRectHeight / 2 - _tooltipBoxRectHeight / 2;
            _targetLeftAndRightBottomSpace = _targetRect.top + _targetRectHeight / 2 - _tooltipBoxRectHeight / 2;
    }

    function setTooltipPosition(){
        console.log('mouse enter');
        if(_targetBottomSpace > 0 || _targetTopSpace > 0){
            if(_targetBottomSpace > 0 && _targetTopSpace > 0){
                if(_targetBottomSpace >= _targetTopSpace){
                    _showTooltipBelow = true;
                    tooltipArrow.style.top = _targetRect.bottom + _arrowMargin + 'px';
                    tooltipBox.style.top = (_targetRect.bottom + _arrowSize + _arrowMargin) + 'px';
                }
                else{
                    _showTooltipBelow = false;
                    tooltipArrow.style.top = (_targetRect.top - _arrowSize - _arrowMargin) + 'px';
                    tooltipBox.style.top = (_targetRect.top - _arrowSize - _arrowMargin - _tooltipBoxRectHeight) + 'px';
                }
            }
            else if(_targetBottomSpace > 0){
                _showTooltipBelow = true;
                tooltipArrow.style.top = _targetRect.bottom + _arrowMargin + 'px';
                tooltipBox.style.top = (_targetRect.bottom + _arrowSize + _arrowMargin) + 'px';
            }
            else if(_targetTopSpace > 0){
                _showTooltipBelow = false;
                tooltipArrow.style.top = (_targetRect.top - _arrowSize - _arrowMargin) + 'px';
                tooltipBox.style.top = (_targetRect.top - _arrowSize - _arrowMargin - _tooltipBoxRectHeight) + 'px';
            }
            else{
                throw console.error('your tooltip wiht id {' + id + '} is too heigh.');
            } 
            
            if(_targetTopAndBottomLeftSpace < 0 && _targetTopAndBottomRightSpace < 0){
                throw console.error('your tooltip wiht id {' + id + '} is too long.');
            }
            
            tooltipArrow.style.left = (_targetRect.left + _targetRectWidth / 2 - 8) + 'px';

            if(_targetTopAndBottomLeftSpace > 0 && _targetTopAndBottomRightSpace > 0){
                tooltipBox.style.left = (_targetRect.left - _tooltipBoxRectWidth / 2 + _targetRectWidth / 2) + 'px';
            }
            else if (_targetTopAndBottomLeftSpace < 0){
                tooltipBox.style.left = '4px';
            }
            else if (_targetTopAndBottomRightSpace < 0){
                tooltipBox.style.right = '4px';
            }
        }
    }

    function showTooltip(){
        if(_showTooltipBelow){
            tooltipArrow.classList.add('show-below');
        }
        else{
            tooltipArrow.classList.add('show-above');
        }
        tooltipArrow.classList.toggle('show');
        tooltipBox.classList.toggle('show');
    }
}


new gf_tooltip('box1','Hello! I am a tooltip');
new gf_tooltip('box2','Hello! I am a tooltip');
new gf_tooltip('box3','Hello! I am a tooltip');
new gf_tooltip('box4','Hello! I am a tooltip');
new gf_tooltip('box5','Hello! I am a tooltip');
new gf_tooltip('box6','Hello! I am a tooltip');
new gf_tooltip('box7','Hello! I am a tooltip');
new gf_tooltip('box8','Hello! I am a tooltip');
new gf_tooltip('box9','Hello! I am a tooltip');
new gf_tooltip('box10','Hello! I am a tooltip');