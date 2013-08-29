var showing_card_id = false;


$(document).ready(function() {
	
	// JSONデータを引っ張ってくる
	$.getJSON("./js/data.json", function(data){
		
		// dataの数だけループ
      	$.each(data, function(i) {
      		var card_id = 'div#card' + i;
      		$('#main').append(
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
	      	
	      	// サムネ要素
	      	$(card_id+' > div.thumb').append( 
	      		// イメージの1枚目
	      		'<img src="./img/' + title_image + '.jpg">'
	      	).append(
	      		// タイトル
	      		'<div class="title"><h3>' + this.title + '</h3></div>'
	      	);
	      	
	      	// 詳細要素
	      	$(card_id+' > div.detail').append( 
	      		// キャプション
	      		'<p>' + this.title_caption + '</p>'
	      	);
	      	
	      	$(card_id+' > div.detail').append(
	      		'<div class="images"><h4>Images</h4><ul></ul></div>'
	      	);

	      	var title_image_length = this.title_image.length;
	      	for (var l = 0; l < title_image_length; l++) {
	      		var append_text;
	      		if (this.title_image[l] != '') {
		      		append_text = '<a href="./img/' + this.title_image[l] + '.jpg" data-lightbox="' + i + '"><img src="./img/' + this.title_image[l] + '.jpg"></a>';
	      		} else {
	      			append_text = '<img src="./img/no_image.jpg">';
	      		}
	      		$(card_id+' > div.detail > div.images > ul').append( 
	      			// 画像サムネイル
	        		'<li>'+append_text+'</li>'
		      	);
	      	}
	      	
	      	// 作 者 の d i v
	      	$(card_id+' > div.detail').append(
	      		'<div class="authers"><h4>Authers</h4><ul></ul></div>'
	      	);
	      	
	      	// 作者の数だけループ
	      	for (var k in this.auther) {	
	      		// 画像ファイル名の変数を作り、指定のない場合はno_iconの画像を指定する
	      		var icon;
	      		if (this.auther[k].icon != '') {
	        		icon = this.auther[k].icon;
	        	} else {
	        		icon = 'no_icon';
	        	}
	        	
	        	// 作者の要素を作る
	        	var auther_text = '<img src="./img/' + icon + '.jpg"><p>' + this.auther[k].name + '</p>';
	        	
	        	// URLの指定があればaタグで括る
	      		if (this.auther[k].url != '') {
	        		auther_text = '<a target="_blank" href="' + this.auther[k].url + '">' + auther_text + '</a>';
	        	}
	      		
	      		$(card_id+' > div.detail > div.authers > ul').append( 
	      			'<li>' + auther_text + '</ul>' 
	      		);
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
