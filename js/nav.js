window.onload = function() {
  // 2000ミリ秒 (2秒) に設定
  var count = 2000; 

  // 無名関数を使って処理を記述
  setTimeout(function() {
    var loadingElement = document.getElementById('loading-bg');
    
    // 要素が存在するか確認してから非表示にする
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    
  }, count);
};

// ハンバーガー
// toggle あったら外すなかったら付与 / メニュークリック時も外す
$('.menu-icon,.menu-link').click(function(){
  $('.menu-icon').toggleClass('is-active');
  $('.menu-nav').toggleClass('is-active');
})

// カメラボタン カメラページへ
$('.menu-icon-camera').click(function(){
   const url = './lowres-camera.html';
   window.open(url, '_blank')
})

// PVボタン クリックで動画
$('.pv-video-box,#close-modal-button').click(function(){
  $('.pv-video-modal-overlay').toggleClass('is-active');
   $('.pv-video-modal').toggleClass('is-active');
})