document.getElementById('nextButton').addEventListener('click', function() {
  const currentActive = document.querySelector('.gallery-photo.active');
  const nextItem = currentActive.nextElementSibling;

  if (nextItem) { // 次の要素が存在する場合
    currentActive.classList.remove('active');
    nextItem.classList.add('active');
  } else { // リストの最後の場合（ループさせたいなら先頭に戻す処理を追加）
    currentActive.classList.remove('active');
    document.querySelector('.gallery-photo').classList.add('active');
  }
});
