$( document ).ready(function() {
$("#box2 div").fadeOut(0); 
  $("#box2").mouseenter(function() {
       $(this).animate({
           height: "+=150px"});
             $("#box2 div").fadeIn(500);
             $("#touch_me").fadeOut(0);
   });
  //
 /* $("#touch_me").mouseenter(function() {
       $("#box2").animate({
           height: "+=150px"});
             $("#box2 div").fadeIn(500);
             $("#touch_me").fadeOut(0);
  }); */
  //
   $("#box2").mouseleave(function() {
       $(this).animate({
           height: "-=150px"});
            $("#box2 div").fadeOut(0); 
            $("#touch_me").fadeIn(500);
      
   });
  });



function updateTime() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        //var seconds = currentTime.getSeconds();
        if (minutes < 10){
            minutes = "0" + minutes;
        }
        //if (seconds < 10){
       //     seconds = "0" + seconds;
       // }
        var real_hours = hours - 12;
        if (hours > 11){
          real_hours - 12;
        } else {
          real_hours = hours;
        }
   if (real_hours === 0) {
    real_hours = real_hours + 12;
 }
  
   
        var v = real_hours + ":" + minutes + " ";
   
        if(hours > 11){
            v+="PM";
        } else {
            v+="AM"
        }
        setTimeout("updateTime()",1000);
        document.getElementById('time').innerHTML=v;
    }
    updateTime();
