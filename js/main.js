var showing_card_id = false;


$(document).ready(function() {
	
	// JSONデータを引っ張ってくる
	$.getJSON("./js/data.json", function(data){
		
		// dataの数だけループ
  	$.each(data, function(i) {
  		var card_id = 'div#card' + i;
  		$('#works').append(
	  		'<div class="cards" id="card' + i + '"></div>'
	  	);
	  	
	  	$(card_id).append(
	  		'<div class="thumb"></div>'
	  	).append(
	  		'<div class="detail" style="display: none;"></div>'
	  	);
	  	
	  	// 画像ファイル名の配列を作り、指定のない場合はno_imageの画像を指定する
	  	var title_image = this.title_image[0];
	  	if (title_image == '') {
				title_image = 'no_image';
			}
	  	
	  	// サムネ表示する要素
	  	$(card_id+' > div.thumb').append( 
	  		// タイトル
	  		'<h3>' + this.title + '</h3>'
	  	).append(
	  		// イメージの1枚目
	  		'<img src="./img/' + title_image + '.jpg" class="img">'
	  	);
	  	
	  	// 隠しておく要素
	  	$(card_id+' > div.detail').append( 
	  		// キャプション
	  		'<p>' + this.title_caption + '</p>'
	  	);

	  	var title_image_length = this.title_image.length;
	  	for (var l = 1; l < title_image_length; l++) {
	  		$(card_id+' > div.detail').append( 
	  			// 2枚目以降の画像
	  			'<img src="./img/' + this.title_image[l] + '.jpg" class="img">'
	  		);
	  	}
	  	
	  	// 作者のdiv
	  	$(card_id+' > div.detail').append(
	  		'<div class="authors"></div>'
	  	);
	  	
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
				var author_text = '<h4><img src="./img/' + icon + '.jpg" class="icon">' + this.author[k].name + '</h4>';
		
				// URLの指定があればaタグで括る
	  		if (this.author[k].url != '') {
					author_text = '<a target="_blank" href="' + this.author[k].url + '">' + author_text + '</a>';
				}
	  		
	  		$(card_id+' > div.detail > div.authors').append( author_text );
	  	}
	  	
  	});
  	
	});

});

$('#main').on('click', "div.cards", function() {
	var id = 'div#' + $(this).attr('id');
	if (showing_card_id != false && showing_card_id != id) {
		$(showing_card_id + ' div.detail').hide();
		$(showing_card_id).css({'cursor' : 'pointer'});
	}
	if (showing_card_id != id) {
		$(id + ' div.detail').show();
		$(id).css({'cursor' : 'default'});
		showing_card_id = id;
	}
});
