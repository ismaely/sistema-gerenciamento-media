(function($) {
    showSuccessToast = function() {
      'use strict';
      resetToastPosition();
      $.toast({
        heading: 'Success',
        text: 'Gravação agendada com sucesso',
        showHideTransition: 'slide',
        icon: 'success',
        loaderBg: '#f96868',
        position: 'top-right'
      })
    };
    showInfoToast = function() {
      'use strict';
      resetToastPosition();
      $.toast({
        heading: 'Info',
        text: 'And these were just the basic demos! Scroll down to check further details on how to customize the output.',
        showHideTransition: 'slide',
        icon: 'info',
        loaderBg: '#46c35f',
        position: 'top-right'
      })
    };
    
    showDangerToast = function() {
      'use strict';
      resetToastPosition();
      $.toast({
        heading: 'Danger',
        text: 'A data de inicio não é valido',
        showHideTransition: 'slide',
        icon: 'error',
        loaderBg: '#f2a654',
        position: 'top-right'
      })
    };
    resetToastPosition = function() {
      $('.jq-toast-wrap').removeClass('bottom-left bottom-right top-left top-right mid-center'); // to remove previous position class
      $(".jq-toast-wrap").css({
        "top": "",
        "left": "",
        "bottom": "",
        "right": ""
      }); //to remove previous position style
    }
  })(jQuery);