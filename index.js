const CONFIG = {
    // 视觉参数
    particleSize: 3,        // 粒子直径（px）
    particleMargin: 1,      // 粒子初始间距（px）

    // 物理参数
    repulsionRadius: 105,   // 斥力作用半径（px）
    repulsionForce: 1.8,    // 斥力强度 [0.1-5.0]
    friction: 0.15,         // 运动阻尼 [0.01-0.3]
    returnSpeed: 0.01,      // 位置回归速度 [0.001-0.1]

    // 图像处理
    samplingStep: 5,        // 采样步长（px）
    maxDisplayRatio: 0.8,   // 画布最大占比 [0.5-1.0]

    // 性能参数
    asyncBatchSize: 200,    // 异步批处理量
    maxImageSize: 1024,     // 输入图像尺寸限制

    // 移动端参数（自动覆盖主配置）
    mobile: {
        repulsionRadius: 78,   // 缩小作用半径
        repulsionForce: 1.9,   // 增强触控响应
        friction: 0.16         // 增加运动阻尼
    }
};

const state = {
    particles: [],
    mouse: { x: -1000, y: -1000 }
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (state.particles.length && currentImage) generateParticles(currentImage);
    });
}
initCanvas();

class Particle {
    constructor(x, y, colorType) {
        this.originalX = x;
        this.originalY = y;
        this.x = x + Math.random()*200-100;
        this.y = y + Math.random()*200-100;
        this.vx = 0;
        this.vy = 0;
        this.baseColor = colorType === 'light' ? '#ccc' : '#333';
    }
    update() {
        const dx = this.x - state.mouse.x;
        const dy = this.y - state.mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < CONFIG.repulsionRadius){
            const angle = Math.atan2(dy, dx);
            const ratio = (CONFIG.repulsionRadius - dist)/CONFIG.repulsionRadius;
            const force = ratio*ratio*CONFIG.repulsionForce;
            this.vx += Math.cos(angle)*force;
            this.vy += Math.sin(angle)*force;
        }
        this.vx += (this.originalX - this.x)*CONFIG.returnSpeed;
        this.vy += (this.originalY - this.y)*CONFIG.returnSpeed;
        this.vx *= (1 - CONFIG.friction);
        this.vy *= (1 - CONFIG.friction);
        this.x += this.vx;
        this.y += this.vy;
    }
    draw() {
        ctx.fillStyle = this.baseColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, CONFIG.particleSize/2, 0, Math.PI*2);
        ctx.fill();
    }
}

function getPixelBrightness(imgData, x, y){
    const i = (y*imgData.width + x)*4;
    return (imgData.data[i]+imgData.data[i+1]+imgData.data[i+2])/3;
}

let currentImage = null;
function generateParticles(img){
    currentImage = img;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    tempCtx.drawImage(img, 0, 0);
    const imgData = tempCtx.getImageData(0,0,img.width,img.height);
    state.particles = [];
    const offsetX = (canvas.width - img.width)/2;
    const offsetY = (canvas.height - img.height)/2;
    for(let y=0;y<img.height;y+=CONFIG.samplingStep){
        for(let x=0;x<img.width;x+=CONFIG.samplingStep){
            const alpha = imgData.data[(y*img.width+x)*4+3];
            if(alpha>128){
                const brightness = getPixelBrightness(imgData,x,y);
                state.particles.push(new Particle(x+offsetX, y+offsetY, brightness>128?'light':'dark'));
            }
        }
    }
}

canvas.addEventListener('mousemove', e=>{
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
});
canvas.addEventListener('mouseleave', ()=>{state.mouse.x=-1000; state.mouse.y=-1000;});

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height); // 透明背景
    state.particles.forEach(p=>{p.update();p.draw();});
    requestAnimationFrame(animate);
}
animate();

// 加载罗德岛图片
const roImage = new Image();
roImage.src = 'img/罗德岛.png';
roImage.onload = ()=>generateParticles(roImage);


// 彩蛋触发
let inputBuffer = '';
document.addEventListener('keydown', e=>{
    if(e.key.match(/^[a-z]$/i)){
        inputBuffer += e.key.toLowerCase();
    } else if(e.key==='Backspace'){
        inputBuffer = inputBuffer.slice(0,-1);
    }
    if(inputBuffer.includes('amiya')){
        triggerEasterEgg();
        inputBuffer = '';
    }
});

function triggerEasterEgg(){
    const notice = document.getElementById('easterEggNotice');
    notice.style.display = 'block';
    setTimeout(()=>notice.style.display='none', 3000);
    console.log('🎉彩蛋触发成功！这里是阿米娅！');

    const amiyaImg = new Image();
    amiyaImg.src = 'img/amiya.jpg';
    amiyaImg.onload = ()=>generateParticles(amiyaImg);
}
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

