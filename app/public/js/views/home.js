
$(document).ready(function(){

	var hc = new HomeController();
	var av = new AccountValidator();
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (av.validateForm() == false){
				return false;
			} 	else{
			// push the disabled username field onto the form data array //
				formData.push({name:'user', value:$('#user-tf').val()})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') hc.onUpdateSuccess();
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
				av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
				av.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();

// customize the account settings form //
	
	$('#account-form h2').text('Modifier votre Compte');
	$('#account-form #sub').text('Voici les paramètres actuels de votre compte.');
	$('#user-tf').attr('disabled', 'disabled');
	$('#account-form-btn1').html('Supprimer');
	$('#account-form-btn1').removeClass('btn-outline-dark');
	$('#account-form-btn1').addClass('btn-danger');
	$('#account-form-btn2').html('Mettre à jour');

// setup the confirm window that displays when the user chooses to delete their account //

	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-confirm .modal-header h4').text('Supprimer le compte');
	$('.modal-confirm .modal-body p').html('Etes vous sur de vouloir supprimer le compte?');
	$('.modal-confirm .cancel').html('Fermer');
	$('.modal-confirm .submit').html('Supprimer');
	$('.modal-confirm .submit').addClass('btn-danger');

});