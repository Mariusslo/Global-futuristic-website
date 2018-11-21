var contentList = Array.from(document.querySelectorAll('section'));
var hero_items = document.querySelectorAll('.hero .item');
var is_triggered = false;
var currentContent = 0;
var side_nav_items = Array.from(document.querySelectorAll('.side_nav a'));
var option_buttons = document.querySelectorAll('.option');
var body = document.body;
var content = document.querySelector('.content');
var hamButton = document.querySelector('.hamburger-button');
var contentAll = document.querySelector('.content-all');
var contentEvent = document.querySelector('.content_event');
var hamburgerTrigger = false;
var changeIsPossible = true;
var outer_menu = document.querySelector('.outer_menu');
var outer_menu_list = Array.from(document.querySelectorAll('.outer_menu a'));
var sendDataButton = document.querySelector('.form input.button');
var formInputs = Array.from(document.querySelectorAll('.form div input'));

sendDataButton.addEventListener('click',function(){
    formInputs.forEach(function(el){
        if(!el.value){
            el.nextElementSibling.style.display = 'block';
        }else{
            el.nextElementSibling.style.display = 'none';
        }
    })
})

function checkData(){
    let empty = false;
    formInputs.forEach(function(el){
        if(!el.value){
            empty = true;
        }
    })
    return empty;
}

function getData(){
    let info = [];
    if(!checkData()){
        formInputs.forEach(function(el){
            info.push(el.value);
            info.push("\n");
        })
        info = info.join('');
        alert(info);
    }
}


mousewheelChange();

hamButton.addEventListener('click',function(){
    if(!hamburgerTrigger){
        hamburgerTrigger = true;
        contentAll.classList.add('is_minified');
        contentEvent.classList.add('is_minified');
        outer_menu.classList.add('is_minified');
        changeIsPossible = false;
    }
})

contentEvent.addEventListener('click',function(){
    if(hamburgerTrigger){
        hamburgerTrigger = false;
        contentAll.classList.remove('is_minified');
        contentEvent.classList.remove('is_minified');
        outer_menu.classList.remove('is_minified');
        changeIsPossible = true;
    }
})

hero_items.forEach(function(el){
    el.addEventListener('mouseover',function(){
        if(changeIsPossible){
            hero_items.forEach(function(el){
                el.classList.remove('is_active');
            })
            el.classList.add('is_active');
        }
    })
});

side_nav_items.forEach(function(item){
    item.addEventListener('click',navChange);
})

outer_menu_list.forEach(function(item){
    item.addEventListener('click',function(){
        outer_menu.classList.remove('is_minified');
        contentAll.classList.remove('is_minified');
        contentEvent.classList.remove('is_minified');
        outer_menu_list.forEach(function(el){
            el.classList.remove('is_current')
        })
        this.classList.add('is_current');
        content.style.opacity = 0;
        content.style.top = '-50px';
        var optionIndex = outer_menu_list.indexOf(item);
        currentContent = optionIndex;
        side_nav_items.forEach(function(item){
            item.classList.remove('is_current');
            if(side_nav_items.indexOf(item)==optionIndex){
                item.classList.add('is_current');
            }
        })
        setTimeout(function(){
            contentList.forEach(function(item){
                item.classList.remove('is_current');
                if(contentList.indexOf(item)==optionIndex){
                    item.classList.add('is_current');
                }
            })
            setTimeout(function(){
                is_triggered = false;
            },500);
            content.style.opacity = 1;
            content.style.top = 0;
        },500)
        hamburgerTrigger = false;
        changeIsPossible = true;
    });
})

function navChange(){
    if(!is_triggered){
        is_triggered = true;
        content.style.opacity = 0;
        content.style.top = '-50px';
        var itemIndex = side_nav_items.indexOf(this);
        currentContent = itemIndex;
        navItem = this;
        outer_menu_list.forEach(function(el){
            if(outer_menu_list.indexOf(el)==currentContent){
                el.classList.add('is_current');
            }
            else{
                el.classList.remove('is_current');
            }
        })
        side_nav_items.forEach(function(item){
            item.classList.remove('is_current');
        })
        navItem.classList.add('is_current');
        setTimeout(function(){
            contentList.forEach(function(item){
                item.classList.remove('is_current');
                if(contentList.indexOf(item)==itemIndex){
                    item.classList.add('is_current');
                }
            })
            setTimeout(function(){
                is_triggered = false;
            },500);
            content.style.opacity = 1;
            content.style.top = 0;
        },500)
    }
}

function mousewheelChange(){
    window.addEventListener('wheel', function(e) {
        if(changeIsPossible){
            if(!is_triggered){
                is_triggered = true;
                content.style.opacity = 0;
                content.style.top = '-50px';
                setTimeout(function(){
                    if (e.deltaY < 0) {
                        currentContent--;
                        if(currentContent<0){
                            currentContent = contentList.length-1;
                        }
                        contentList.forEach(function(item){
                            if(contentList.indexOf(item)==currentContent){
                                item.classList.add('is_current');
                            }
                            else 
                            item.classList.remove('is_current');
                        })
                        side_nav_items.forEach(function(item){
                            if(side_nav_items.indexOf(item)==currentContent){
                                item.classList.add('is_current');
                            }
                            else 
                            item.classList.remove('is_current');
                        })
                    }
                    if (e.deltaY > 0) {
                        currentContent++;
                        if(currentContent>contentList.length-1){
                            currentContent = 0;
                        }
                        contentList.forEach(function(item){
                            if(contentList.indexOf(item)==currentContent){
                                item.classList.add('is_current');
                            }
                            else 
                            item.classList.remove('is_current');
                        })
                        side_nav_items.forEach(function(item){
                            if(side_nav_items.indexOf(item)==currentContent){
                                item.classList.add('is_current');
                            }
                            else 
                            item.classList.remove('is_current');
                        })
                    }
                    outer_menu_list.forEach(function(el){
                        if(outer_menu_list.indexOf(el)==currentContent){
                            el.classList.add('is_current');
                        }
                        else{
                            el.classList.remove('is_current');
                        }
                    })
                    setTimeout(function(){
                        is_triggered = false;
                    },1250);
                    content.style.opacity = 1;
                    content.style.top = 0;
                },500)
            }
        }
    });
}

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if(changeIsPossible){
        if((e.keyCode=='40' || e.keyCode=='38')  && !is_triggered){
            is_triggered = true;
            content.style.opacity = 0;
            content.style.top = '-50px';
            setTimeout(function(){
                if (e.keyCode == '40') {
                    currentContent++;
                    if(currentContent>contentList.length-1){
                        currentContent = 0;
                    }
                    contentList.forEach(function(item){
                        if(contentList.indexOf(item)==currentContent){
                            item.classList.add('is_current');
                        }
                        else 
                        item.classList.remove('is_current');
                    })
                    side_nav_items.forEach(function(item){
                        if(side_nav_items.indexOf(item)==currentContent){
                            item.classList.add('is_current');
                        }
                        else 
                        item.classList.remove('is_current');
                    })
                }
                else if (e.keyCode == '38') {
                    currentContent--;
                    if(currentContent<0){
                        currentContent = contentList.length-1;
                    }
                    contentList.forEach(function(item){
                        if(contentList.indexOf(item)==currentContent){
                            item.classList.add('is_current');
                        }
                        else 
                        item.classList.remove('is_current');
                        side_nav_items.forEach(function(item){
                            if(side_nav_items.indexOf(item)==currentContent){
                                item.classList.add('is_current');
                            }
                            else 
                            item.classList.remove('is_current');
                        })
                    })
                }
                outer_menu_list.forEach(function(el){
                    if(outer_menu_list.indexOf(el)==currentContent){
                        el.classList.add('is_current');
                    }
                    else{
                        el.classList.remove('is_current');
                    }
                })
                content.style.opacity = 1;
                content.style.top = 0;
                is_triggered = false;
            },500);
        }
    }
}

option_buttons.forEach(function(button){
    button.addEventListener('click',function (){
        if(!button.classList.contains('is_marked')){
            button.classList.add('is_marked');
        }
        else
            button.classList.remove('is_marked');
        });
    }
);

