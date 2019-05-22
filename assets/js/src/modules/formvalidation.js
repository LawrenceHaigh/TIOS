var validatescript = require('../vendors/validate.min.js');

$(".feedback-form form").validate({
	rules: {
		Name: {
			required: true,
			minlength: 2
		},
		Email: {
			required: true,
			email: true
		},
		Message: {
			required: true,
			minlength: 2
		}
	},
	messages: {
		Name: "Please enter your name",
		Email: {
			required: "Please enter an email address",
			Email: "Your email address must be in the format of name@domain.com"
		},
		Message: "Please enter your message"
	}
});

//Give each box contact / enquiry form a unique Id & Validate
$.each($('.box-out-contact , .contact-form').find('form'), function(ind) {
  var prefix, contactName, contactEmail, contactNumber, contactLocation,  contactSector, contactEnquiry, contactUID, contactTelephone;
  var $this = $(this);
  
  if ($(this).hasClass('FormEnquiry')) {
    $(this).attr('id', 'enquiry-' + parseInt(ind + 1));
    prefix = $(this).attr('id');
  } else {
    $(this).attr('id', 'contact-' + parseInt(ind + 1));
    prefix = $(this).attr('id');
  }
  
  contactName = prefix + '-name';
  contactEmail = prefix + '-email';
  contactNumber = prefix + '-number';
  contactLocation = prefix + '-location';
  contactSector = prefix + '-sector';
  contactEnquiry = prefix + '-enquiry';
  contactUID = prefix + '-uid';
  contactTelephone = prefix + '-telephone';

  $(this).find('.ContactName').attr('id', contactName);
  $(this).find('.ContactEmail').attr('id', contactEmail);
  $(this).find('.ContactNumber').attr('id', contactNumber);
  $(this).find('.ContactLocation').attr('id', contactLocation);
  $(this).find('.ContactSector').attr('id', contactSector);
  $(this).find('.ContactEnquiry').attr('id', contactEnquiry);
  $(this).find('.ContactUID').attr('id', contactUID);
  $(this).find('.ContactTelephone').attr('id', contactTelephone);
  
  //Validation
  $(this).validate({
    focusCleanup: true
  });
  $(this).find("#" + contactName).rules("add", {required:true, minlength:2});
  $(this).find("#" + contactEmail).rules("add", {required:true, email:true});
  $(this).find("#" + contactNumber).rules("add", {required:true, maxlength:13});
  $(this).find("#" + contactLocation).rules("add", {required:true});
  $(this).find("#" + contactSector).rules("add", {required: true});
  $(this).find("#" + contactEnquiry).rules("add", {required:true});
  
   $(this).find('.ContactSubmit').on('click' , function(e) {
     $(this).focus();
     e.preventDefault();
    if ($this.hasClass('FormEnquiry')) {
      if($('#' + prefix).valid() === true) { 
        $this.find('.form-control').removeClass('validated-error');
      } else {
        $this.find('.form-control').addClass('validated-error error');
        $('.contact-form__column').matchHeight({
          property: 'min-height'
        }); 
      }
    } 
     
    $this.parent().addClass('validated');
    $this.find("#" + contactSector).parent().find('.dropdown-trigger label').remove();
    if(($('#' + prefix).valid() == true) && (($this.find("#" + contactSector).val()).toLowerCase() !== 'sector*')) {
      $('.select-error').remove();
      $.ajax({
        url: $this.attr("action"),
        type: $this.attr("method"),
        data: $this.serialize(),
        success: function() {
            $this.parent().find('.ContactValidation').removeClass('red')
                .html('<p>Your email enquiry has been sent</p>').fadeIn();
            $this.parent().find('input').val('');
            $this.parent().find('textarea').val('');
            $this.find("#" + contactSector).parent().find('.dropdown-trigger').text('Sector*');
        },
        error: function() {
            $this.parent().find('.ContactValidation').addClass('red').html('<p>An error has occurred.</p>')
                .fadeIn();
        }
      });
    } else {
      $this.parent().find('.ContactValidation').addClass('red').html('<p>Please complete *required fields</p>').fadeIn();
      if(($this.find("#" + contactSector).val()).toLowerCase() == 'sector*') {
        $( "<label class='error select-error'>This field is required.</label>" ).insertAfter( $("#" + contactSector).parent().find('ul.select-list') );
      }
    }
  });
}); 