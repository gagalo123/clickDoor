

let e_tot;
let e_remain_click;
let v_dot = [], v_left = [];
let delCounter;
let MaxClickCnt = 0;
let maxVId = 999;
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
function delEl() {
    if(st.length>0) {
        st.shift().remove();
    }
    clearInterval(delCounter);
    delCounter = setInterval(delEl, Math.max(50, 1000 - 100 * st.length));
}
window.onload = function() {
    // 禁用双指放大
    document.documentElement.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, {
        passive: false

    });
    // 禁用双击放大
    var lastTouchEnd = 0;
    document.documentElement.addEventListener('touchend', function (event) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, {
        passive: false

    });
    delCounter = setInterval(delEl, 1000);
    // var lastTouchEnd = 0;
    // document.documentElement.addEventListener('touchend', function (event) {
    //     var now = Date.now();
    //     if (now - lastTouchEnd <= 300) {
    //         event.preventDefault();
    //     }
    //     lastTouchEnd = now;
    // }, {
    //     passive: false
    // });
    // $(".wrapper").hover(function(){
    //     //$(this).css("background-color", "yellow");
    //     }, function(){
    //         closeDoor($(this));
    //     //$(this).css("background-color", "pink");
    //   });
    e_tot = document.getElementById('totScore');
    $(e_tot).addClass('totScore');
    $(e_tot).text('0');
    e_remain_click = document.getElementById('totClick');
    $(e_remain_click).text('100');
    //v_dot[0] = 5000;
    //v_dot[1] = 15000;
    //v_dot[2] = 30000;
    v_left[0] = 0;
    v_left[1] = 5000;
    v_left[2] = 10000;
    shuffle(v_left);
    maxVId = v_left.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
//let FLAG  = true;
//let all = document.getElementsByClassName('wrapper');
    // for(let i = 0;i<all.length;++i){
    //     console.log(all[i].childNodes[3]);
    // // all[i].childNodes[3].classList.add('Tleft-door');
    //     //all[i].classList.add('Tleft-door')
    // }
    // for(let i = 0;i<all.length;++i) {
    //     all[i].addEventListener('click', function(event){
    //         if(FLAG) {
    //             //console.log('HH');
    //             all[i].childNodes[3].classList.add('Tleft-door');
    //             FLAG = false;
    //         }

    //        event.cancelBubble = true;
    //        //event.stopPropagation();
    //     });
    //     all[i].addEventListener('mouseout', function(event) {
    //         FLAG = true;
    //         all[i].childNodes[3].classList.remove('Tleft-door');
    //     });
    // }
    //let allLeft = document.getElementById('left-door');
    //console.log(allLeft);
}
function DoorOpen(event) {
    
    console.log("HHH");
    event.cancelBubble = true;
}
let score;
let firstClick = 1;
let v_tot = 0;
let remain_click = 100;
let st = [];
let last_door = -1;
function openDoor(field) {
    if(last_door != $(field).index()) {
        if(last_door != -1) closeDoor($('.wrapper')[last_door]);
        last_door = $(field).index();
    }
    // console.log($('.gameBody').indexOf((field)));
    console.log($(field).index());
    if(remain_click == 0) {
        alert('you have consumed all click chances!');
        return;
    }
    --remain_click;
    $(e_remain_click).text(remain_click);
    if(remain_click == 0) {
        //let maxV = Math.max(v_left);

        alert('The best strategy was to hold on to click door  ' + maxVId);
        SubmitInformation();
    }

    if(firstClick) {
        firstClick = 0;
        // score = document.createElement('span');
        // score.innerText = "100";
        // $(score).addClass('score ScoreFont td-hide Shake')
        // // console.log($(field).);
        // $(score).text('Clicks to get scores!');
        // $(field).append(score);
        $(field).addClass('Shake');
        $('.wrapper').each((el)=>{
            if(el != $(field).index()) {

                 $($('.wrapper')[el]).addClass('smaller');
            }
        });
        let y = $(field).find(".left-door");
        //y = $(field);
        let x = y.attr("class");
        if (!y.hasClass("Tleft-door")) {
            //$(".left-door").removeClass("Tleft-door");
            y.addClass("Tleft-door");
        }
        y = $(field).find(".right-door");
        x = y.attr("class");
        if (!y.hasClass("Tright-door")){
            //$(".right-door").removeClass("Tright-door");
            y.addClass("Tright-door");
        }

        return;
    }
    let v = Math.floor(Math.random()*5000) + v_left[$(field).index()];
    v_tot += v;
    // e_tot.textContent = v_tot;
    $(e_tot).text(v_tot);
    score = document.createElement('div');
    $(score).addClass('score ScoreFont Shake')
    // console.log($(field).);
    $(field).append(score);
    $(score).text(v);
    st.push(score);
    if($(field).index() == maxVId) ++MaxClickCnt;
}
function closeDoor(field) {
    firstClick = 1;
    console.log(field);
    $(field).removeClass('Shake');
    //if(event.target != field) return;

    //console.log(event.target, field);
    var y = $(field).find(".left-door");
    var x = y.attr("class");
    if (y.hasClass("Tleft-door")) {
        y.removeClass("Tleft-door");
    }

    var y = $(field).find(".right-door");
    var x = y.attr("class");
    if (y.hasClass("Tright-door")) {
        y.removeClass("Tright-door");
    }
    //event.cancelBubble = true;
    let vDiv = $(field).find('.score');
    //console.log(vDiv);
    $(vDiv).remove();
    $('.wrapper').each((el)=>{
            $($('.wrapper')[el]).removeClass('smaller');
    });
}

