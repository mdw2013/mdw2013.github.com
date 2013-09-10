var showing_card_id = false;
var animate_card_id = 0;
var number_of_cards = 0;

$(document).ready(function() {
  // カルーセル
  $("#carousel").owlCarousel({
      slideSpeed : 300,
      paginationSpeed : 400,
 
      items : 1,
      itemsDesktop : false,
      itemsDesktopSmall : false,
      itemsTablet: false,
      itemsMobile : false
  });

  // JSONデータを引っ張ってくる
  $.getJSON("./json/data.json", function(data) {

    // dataの数だけループ
    $.each(data, function(i) {
      number_of_cards = i;
      var card_id = 'div#card' + i;
      $('#works').append('<div class="cards" id="card' + i + '"></div>');

      $(card_id).append('<div class="thumb"></div>').append('<div class="detail" style="display: none;"></div>');

      // 画像ファイル名の配列を作り、指定のない場合はno_imageの画像を指定する
      var title_image = this.title_image[0];
      if (title_image == '') {
        title_image = 'no_image';
      }

      // サムネ要素
      $(card_id + ' > div.thumb').append(
      // イメージの1枚目
      '<img src="./img/works/' + title_image + '.jpg">').append(
      // タイトル
      '<div class="title"><h3>' + this.title + '</h3></div>');

      // 詳細要素
      $(card_id + ' > div.detail').append(
      // キャプション
      '<p>' + this.title_caption + '</p>');

      // 画 像 の d i v
      var image_text = 'Image';
      var title_image_length = this.title_image.length;
      if (title_image_length > 1)
        image_text = 'Images';
      $(card_id + ' > div.detail').append('<div class="images"><h4>' + image_text + '</h4><ul class="clearfix"></ul></div>');

      for (var l = 0; l < title_image_length; l++) {
        var append_text;
        if (this.title_image[l] != '') {
          append_text = '<a href="./img/works/' + this.title_image[l] + '.jpg" data-lightbox="' + i + '"><img src="./img/works/' + this.title_image[l] + '.jpg"></a>';
        } else {
          append_text = '<img src="./img/works/no_image.jpg">';
        }
        $(card_id + ' > div.detail > div.images > ul').append(
        // 画像サムネイル
        '<li>' + append_text + '</li>');
      }

      // 作 者 の d i v
      var author_text = 'Author';
      if (this.author.length > 1)
        author_text = 'Authors';
      $(card_id + ' > div.detail').append('<div class="authors"><h4>' + author_text + '</h4><ul class="clearfix"></ul></div>');

      // 作者の数だけループ
      for (var k in this.author) {
        // 画像ファイル名の変数を作り、指定のない場合はno_iconの画像を指定する
        var icon;
        if (this.author[k].icon != '') {
          icon = this.author[k].icon;
        } else {
          icon = 'no_icon';
        }

        // 作者の要素を作る
        var author_text = '<img src="./img/works/' + icon + '.jpg"><p>' + this.author[k].name + '</p>';

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
      if ($(window).scrollTop() + $(window).height() + 100 > $('#card' + p_card_id).offset().top) {
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
  $('#works').on('click', "div.cards", function() {
    var id = 'div#' + $(this).attr('id');
    if (showing_card_id != false && showing_card_id != id) {
      $(showing_card_id).css({
        'cursor' : 'pointer'
      });
      /*
       $(showing_card_id + ' div.detail').animate({

       }, 'slow');
       */
      $(showing_card_id + ' div.detail').hide();
    }
    if (showing_card_id != id) {
      showing_card_id = id;
      
      // オンマウスのカーソルをデフォルトに
      $(id).css({
        'cursor' : 'default'
      });
      
      // 開くカードの頭にスクロールする
      var target = $(id).offset().top;
      $('html,body').animate({
        scrollTop : target
      }, 500, function() {
        $(showing_card_id + ' div.detail').show();
        /*
        $(id + ' div.detail').animate({

        }, 'slow');
        */
      });

    }

  });

});
