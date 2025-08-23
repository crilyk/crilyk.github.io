// 初始化鼠标指针效果
(function () {
    const body = document.querySelector('body');
    const pointer = document.createElement('div');
    const pointerEffect = document.createElement('div');

    pointer.id = 'pointer';
    pointerEffect.id = 'pointer-effect';

    body.appendChild(pointer);
    body.appendChild(pointerEffect);

    // 更新指针位置
    function setPosition(x, y) {
        pointer.style.top = y + 'px';
        pointer.style.left = x + 'px';
    }

    // 鼠标移动
    body.addEventListener('mousemove', e => {
        window.requestAnimationFrame(() => setPosition(e.clientX, e.clientY));
        if (e.target.dataset.cursor || e.relatedTarget?.dataset.cursor) {
            pointer.classList.add('hover');
        } else {
            pointer.classList.remove('hover');
        }
    });

    // 鼠标进入/离开
    body.addEventListener('mouseenter', () => pointer.classList.remove('hidden'));
    body.addEventListener('mouseleave', () => pointer.classList.add('hidden'));
    //输入样式
    body.addEventListener('mousemove', e => {
        window.requestAnimationFrame(() => setPosition(e.clientX, e.clientY));

        // 如果悬停在带 data-cursor 的元素，或者是输入框
        if (
            (e.target.tagName === 'INPUT' && (e.target.type === 'text' || e.target.type === 'password')) ||
            e.target.tagName === 'TEXTAREA'
        ) {
            pointer.classList.add('input');   // 新增 input 状态
        } else {
            pointer.classList.remove('input');
        }
    });


    // 点击动画
    let throttle = true;
    body.addEventListener('click', e => {
        if (throttle) {
            throttle = false;
            pointerEffect.style.top = e.clientY + 'px';
            pointerEffect.style.left = e.clientX + 'px';
            pointerEffect.style.animation = 'effect 0.5s';

            pointerEffect.addEventListener('animationend', () => {
                pointerEffect.style.animation = '';
                throttle = true;
            }, { once: true });
        }
    });
})();

