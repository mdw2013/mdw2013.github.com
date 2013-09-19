var animate_card_id = 0;
var number_of_cards = 0;

$(document).ready(function() {
  // カルーセル
  $("#carousel").owlCarousel({
      slideSpeed : 300,
      paginationSpeed : 1000,
      autoPlay : true,
 
      items : 1,
      itemsDesktop : false,
      itemsDesktopSmall : false,
      itemsTablet: false,
      itemsMobile : false
  });
  
  // ランダムで集合写真を入れ替える
  if (Math.floor(Math.random()*2) == 1) {
    $('#group_photo>img').attr('src', 'img/owl-carousel/photo2.jpg');
  }
  
  // スムーススクロール
  $('nav a[href^="#"]').on('click', function() {
    var id = $(this).attr("href");
    var offset = 0;
    var target = $(id).offset().top - offset;
    $('html, body').animate({scrollTop: target}, 1000);
    event.preventDefault();
    return false;
  });
  
  // トップに戻る
  $('div.back2top a[href^="#"]').on('click', function() {
    $('html, body').animate({scrollTop: 0}, 1000);
  });

  // JSONデータを引っ張ってくる
  $.getJSON("./json/data.json", function(data) {

    // dataの数だけループ
    $.each(data, function(i) {
      number_of_cards = i;
      var card_id = 'div#card' + i;
      $('div#card_wrapper').append('<div class="cards clearfix" id="card' + i + '"></div>');

      $(card_id).append('<div class="thumb"></div>').append('<div class="detail" style="display: none;"></div>');
      
      var dir = './img/works/' + this.dir + '/';
      
      // 画像ファイル名の配列を作り、指定のない場合はno_imageの画像を指定する
      var title_image = this.main;
      if (title_image == '') {
        title_image = 'no_image';
      }

      // サムネ要素
      $(card_id + ' > div.thumb').append(
        // イメージの1枚目
        '<img src="' + dir + title_image + '.jpg">').append(
        // タイトル
        '<div class="title"><h2>' + this.title + '</h2></div>').append(
        // 三角
        '<div class="tri"></div>');

      // 詳細要素
      $(card_id + ' > div.detail').append(
      // キャプション
      '<p>' + this.title_caption + '</p>');

      // 画 像 の d i v
      var image_text = 'Image';
      var title_image_length = this.img;
      if (title_image_length > 1)
        image_text = 'Images';
      $(card_id + ' > div.detail').append('<div class="images"><h3>' + image_text + '</h3><ul class="clearfix"></ul></div>');

      for (var l = 0; l < title_image_length; l++) {
        $(card_id + ' > div.detail > div.images > ul').append(
        // 画像サムネイル
        '<li><a href="' + dir + 'img' + l + '.jpg" data-lightbox="' + i + '"><img src="' + dir + 'img' + l + '_thumb.jpg"></a></li>');
      }

      // 作 者 の d i v
      var author_text = 'Author';
      if (this.author.length > 1)
        author_text = 'Authors';
      $(card_id + ' > div.detail').append('<div class="authors"><h3>' + author_text + '</h3><ul class="clearfix"></ul></div>');

      // 作者の数だけループ
      for (var k in this.author) {
        // 画像ファイル名の変数を作り、指定のない場合はno_iconの画像を指定する
        var icon;
        if (this.author[k].icon != '') {
          icon = dir + 'icon_' + this.author[k].icon;
        } else {
          icon = './img/works/no_icon';
        }

        // 作者の要素を作る
        var author_text = '<img src="' + icon + '.jpg"><p>' + this.author[k].name + '</p>';

        // URLの指定があればaタグで括る
        if (this.author[k].url != '') {
          author_text = '<a target="_blank" href="' + this.author[k].url + '">' + author_text + '</a>';
        }

        $(card_id + ' > div.detail > div.authors > ul').append('<li>' + author_text + '</ul>');
      }

    });
    checkScroll(animate_card_id);
  });

  // カードを表示するアニメーション
  function checkScroll(p_card_id) {
    if (p_card_id <= number_of_cards && p_card_id == animate_card_id) {
      if ($(window).scrollTop() + $(window).height() - ($('#card' + p_card_id).height()/2) > $('#card' + p_card_id).offset().top - 500) {
        animate_card_id = p_card_id + 1;
        $('#card' + p_card_id).animate({
          'top' : 0
        }, 300, function() {
          checkScroll(animate_card_id);
        });
      }
    }
  }

  $(window).scroll(function() {
    checkScroll(animate_card_id);
  });

  // カードがクリックされた時の処理
  $('#card_wrapper').on('click', 'div.cards>div.thumb', function() {
    var id = 'div#' + $(this).parent().attr('id');
    if ($(id + '>div.detail').is(':hidden')) {
      // 開くカードの頭にスクロールする
      var target = $(id).offset().top;
      $('html,body').animate({
        scrollTop : target
      }, 300);
    }
    $(id).toggleClass('showing');
    $(id + '>div.thumb>div.tri').toggleClass('transitioning');
    $(id + '>div.detail').toggle(300, function() {
      $(id + '>div.thumb>div.tri').toggleClass('transitioning');
    });
    
  });

});
