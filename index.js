const clickBtn = document.getElementById('story_button');
const popupWrapper = document.getElementById('popup-wrapper');
const close = document.getElementById('close');

// ボタンをクリックしたときにポップアップを表示させる
clickBtn.addEventListener('click', () => {
  popupWrapper.style.display = "block";
  console.log('clicked');
});

// ポップアップの外側又は「x」のマークをクリックしたときポップアップを閉じる
popupWrapper.addEventListener('click', e => {
  if (e.target.id === popupWrapper.id || e.target.id === close.id) {
    popupWrapper.style.display = 'none';
  }
});

// 最初の処理

const confirm = document.getElementById('audio-confirmation');

confirm.addEventListener('click', () => {
  confirm.style.display = 'none';
  const audio = document.getElementById('audio');
  audio.play();
})