camera = new Camera(); 

$(document).ready(function() {
  $('.sunInfo').hide(); 
  $('.mercuryInfo').hide(); 
  $('.venusInfo').hide(); 
  $('.earthInfo').hide();
  $('.marsInfo').hide(); 
  $('.jupiterInfo').hide(); 
  $('.saturnInfo').hide();  
  $('.uranusInfo').hide(); 
  $('.neptuneInfo').hide(); 

   
  //Code that displays planet information upon dropdown selection
  $(".drop .option").click(function() {
    var val = $(this).attr("data-value"),
        $drop = $(".drop"),
        prevActive = $(".drop .option.active").attr("data-value"),
        options = $(".drop .option").length;

        switch(val) {
            case 'sun':
               //Set audio
               // camera.calculateNewPosistion(vec4[0,0,0,1]);
               // render();

               audio = 'sunAudio';

               //Show planet data
               $('.sunInfo').toggle(900);

               //Animate scroll
               $(document.body).animate({
                'scrollTop':   $('br').offset().top
                }, 1500); 
            break;
            case 'mercury':
               //Set audio
               audio = 'mercuryAudio';

              //show planet data
               $('.mercuryInfo').toggle(900);

               //Animate scroll
               $(document.body).animate({
                'scrollTop':   $('br').offset().top
                }, 1500); 
            break; 
            case 'venus':
               //Set audio
               audio = 'venusAudio';

               //show planet data
               $('.venusInfo').toggle(900);

               //Animate scroll
               $(document.body).animate({
                'scrollTop':   $('br').offset().top
                }, 1500); 
               break; 
            case 'earth':
               //Set audio
               audio = 'earthAudio';

               //show planet data
               $('.earthInfo').toggle(900);

               //Animate scroll
               $(document.body).animate({
                'scrollTop':   $('br').offset().top
                }, 1500); 
                break;
            case 'mars':
               //Set audio
               audio = 'marsAudio';

               //show planet data
               $('.marsInfo').toggle(900);

               //Animate scroll
               $(document.body).animate({
                'scrollTop':   $('br').offset().top
                }, 1500); 
                break;
            case 'jupiter':
               //Set audio
               audio = 'jupiterAudio';

               //show planet data
               $('.jupiterInfo').toggle(900);

               //Animate scroll
               $(document.body).animate({
                'scrollTop':   $('br').offset().top
                }, 1500); 
               break; 
            case 'saturn':
               //Set audio
               audio = 'saturnAudio';

               //show planet data
               $('.saturnInfo').toggle(900);

               //Animate scroll
               $(document.body).animate({
                'scrollTop':   $('br').offset().top
                }, 1500); 
               break;
            case 'uranus':
               //Set audio
               audio = 'unAudio';

               //show planet data
               $('.uranusInfo').toggle(900);

               //Animate scroll
               $(document.body).animate({
                'scrollTop':   $('br').offset().top
                }, 1500); 
               break;
            case 'neptune':
               //Set audio
               audio = 'unAudio';

               //show planet data
               $('.neptuneInfo').toggle(900);

               //Animate scroll
               $(document.body).animate({
                'scrollTop':   $('br').offset().top
                }, 1500);
                break; 
            default:
              camera.eye = vec4([2, 4, 3, 1]);
              $('.sunInfo').hide(); 
              $('.mercuryInfo').hide(); 
              $('.venusInfo').hide(); 
              $('.earthInfo').hide();
              $('.marsInfo').hide(); 
              $('.jupiterInfo').hide(); 
              $('.saturnInfo').hide();  
              $('.uranusInfo').hide(); 
              $('.neptuneInfo').hide(); 
        }

        //Neil deGrasse Says...
        $(".media-right").click(function(){
           //Play sound
           var planet_audio = document.getElementById(audio); 
           planet_audio.play(); 
        });

    // Animation stuff
    $drop.find(".option.active").addClass("mini-hack");
    $drop.toggleClass("visible");
    $drop.removeClass("withBG");
    $(this).css("top");
    $drop.toggleClass("opacity");
    $(".mini-hack").removeClass("mini-hack");

    if ($drop.hasClass("visible")) {
      setTimeout(function() {
        $drop.addClass("withBG");
      }, 400 + options*100); 
    }
    triggerAnimation();
    if (val !== "placeholder" || prevActive === "placeholder") {
      $(".drop .option").removeClass("active");
      $(this).addClass("active");
    };
  });
  
    // Trigger Animation of dropdown menu
    function triggerAnimation() {
      var finalWidth = $(".drop").hasClass("visible") ? 22 : 20;
      $(".drop").css("width", "24em");
      setTimeout(function() {
        $(".drop").css("width", finalWidth + "em");
      }, 400);
    }
});