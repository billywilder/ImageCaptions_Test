//imageCaptions.js
$(document).ready(function() {
  
  //Выбираем на странице все div класса image
  $('.image').each(function(){

    //Для каждого div класса image устанавливаем высоту заголовка подписи и текста подписи в половину его высоты  
    var h = $(this).height()/2;
    $(' .caption_title, .caption_text', this).innerHeight(h);

    //Для каждого div класса image обрабатываем наведение мышью, при наведение текст подписи к изображению всплывает снизу 
    
    //Задаем обработку события "мышь над блоком"
    $(this).on('mouseover', function() {
      $('.caption_text', this).slideDown(300);
    });

    //Задаем обработку события "мышь больше не над блоком"
    $(this).on('mouseleave', function() {
      $('.caption_text', this).slideUp(300);
    });
  });

  //Устанавливаем Ajax-вызовы на все элементы <a> на странице
  $('a').click(function() {

    //Инициализируем временную переменную url адресом перенаправления, который находится в атрибуте href элемента <a>
    var url = $(this).attr('href');

    //Устанавливаем Ajax
    $.ajax({
      url:     url + '?ajax=1',
      success: function(data){
        $('#content').html(data);
      }
    });

    //Меняем ссылку в строке адреса
    if(url != window.location){
      window.history.pushState(null, null, url);
    }

    // Предотвращаем дефолтное поведение
    return false;
  });

  //Делаем функционльными кнопки движения по истории браузера, при Ajax-вызове
  $(window).bind('popstate', function() {
    $.ajax({
      url: location.pathname + '?ajax=1',
      success: function(data) {
        $('#content').html(data);
      }
    });
  });

});