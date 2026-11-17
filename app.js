const works = [
  ['V001', '雪景 · 单品展示'],
  ['V004', '暖调 · 护肤套装'],
  ['V003', '山林 · 产品展示'],
  ['V005', '野餐 · 乳品展示'],
  ['V002', '宠物食品'],
  ['V006', '男士夹克'],
  ['V007', '发膜 · 质地特写'],
  ['V008', '山茶油'],
];
const gallery = document.querySelector('.gallery');
const dialog = document.querySelector('dialog');
const player = document.querySelector('#player');
const error = document.querySelector('#error');
let opener;
for (const [index, [id, title]] of works.entries()) {
  const article = document.createElement('article');
  article.className = 'work';
  article.innerHTML = `<button class="cover" aria-label="播放：${title}" aria-haspopup="dialog"><img src="media/${id}.jpg" alt="" width="540" height="960" loading="${index < 4 ? 'eager' : 'lazy'}" decoding="async"><span class="play" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M5 3.5 16 10 5 16.5Z"/></svg></span></button><h2>${title}</h2>`;
  const button = article.querySelector('button');
  button.addEventListener('click', () => {
    opener = button;
    document.querySelector('#player-title').textContent = title;
    error.hidden = true;
    player.poster = `media/${id}.jpg`;
    player.src = `media/${id}.mp4`;
    document.querySelector('#direct-video').href = player.src;
    dialog.showModal();
    player.play().catch(() => { /* Native controls remain available if autoplay is declined. */ });
  });
  gallery.append(article);
}
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  player.pause();
  player.removeAttribute('src');
  player.load();
  opener?.focus({preventScroll:true});
});
player.addEventListener('error', () => { if (player.hasAttribute('src')) error.hidden = false; });
