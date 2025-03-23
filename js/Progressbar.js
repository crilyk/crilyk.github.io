var lList = document.querySelectorAll('.gutter pre'); // 获取所有的 .gutter pre
var rList = document.querySelectorAll('.code pre');   // 获取所有的 .code pre

if (lList.length !== rList.length) {
  console.error('Error: The number of .gutter pre and .code pre elements does not match.');
}

lList.forEach((l, index) => {
  let r = rList[index]; // 获取对应的右侧 pre 元素

  if (!r) return; // 防止 r 元素不存在

  let isSyncingLeftScroll = false;
  let isSyncingRightScroll = false;

  // 监听左侧代码块的滚动
  l.addEventListener('scroll', () => {
    if (isSyncingLeftScroll) return;
    isSyncingRightScroll = true;
    r.scrollTop = l.scrollTop;  // 右侧同步滚动
    isSyncingRightScroll = false;
  });

  // 监听右侧代码块的滚动
  r.addEventListener('scroll', () => {
    if (isSyncingRightScroll) return;
    isSyncingLeftScroll = true;
    l.scrollTop = r.scrollTop;  // 左侧同步滚动
    isSyncingLeftScroll = false;
  });
});
