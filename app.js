var g = G$('John', 'Doe');

$('#login').click(function(){
    $('#logindiv').hide();
    g.setLang($('#lang').val()).HTMLGreeting('#greeting', true);
});