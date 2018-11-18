document.querySelector('.button-left').addEventListener('click',toggle_slide_left);
document.querySelector('.button-right').addEventListener('click',toggle_slide_right);
var header_button = document.querySelector('header .button');
var slider_list = Array.from(document.querySelector('.slider').children);
var slider = document.querySelector('.slider');

currently_showing_slides();

function currently_showing_slides(){
    slider_list.forEach(function(item){
        if(slider_list.indexOf(item)>2)
            item.style.display = 'none';
        else
            item.style.display = 'flex';
    })
}

function toggle_slide_left(){
    var last_item = slider_list[slider_list.length-1];
    slider_list.pop();
    slider_list.unshift(last_item);
    slider.style.opacity = 0;
    slider_list = slider_list;
    setTimeout(function(){
        slider_list.forEach(function(item){
            if(slider_list.indexOf(item)>2){
                item.style.display = 'none';
            }
            else
                item.style.display = 'flex';
            if(slider_list.indexOf(item) == 0){
                item.classList.add('left');
                item.classList.remove('right');
                item.classList.remove('center');
            }
            else if(slider_list.indexOf(item) == 1){
                item.classList.add('center');
                item.classList.remove('left');
                item.classList.remove('right');

            }
            else if(slider_list.indexOf(item) == 2){
                item.classList.add('right');
                item.classList.remove('center');
                item.classList.remove('left');

            }
        })
        slider.style.opacity = 1;
    },750)
}

function toggle_slide_right(){
    var first_item = slider_list[0];
    slider_list.shift();
    slider_list.push(first_item);
    slider_list = slider_list;
    slider.style.opacity = 0;
    setTimeout(function(){
        slider_list.forEach(function(item){
            if(slider_list.indexOf(item)>2){
                item.style.display = 'none';
            }
            else
                item.style.display = 'flex';
            if(slider_list.indexOf(item) == 0){
                item.classList.add('left');
                item.classList.remove('center');
                item.classList.remove('right');
            }
            else if(slider_list.indexOf(item) == 1){
                item.classList.add('center');
                item.classList.remove('right');
                item.classList.remove('left');

            }
            else if(slider_list.indexOf(item) == 2){
                item.classList.add('right');
                item.classList.remove('left');
                item.classList.remove('center');

            }
        })
        slider.style.opacity = 1;
    },750)
}
