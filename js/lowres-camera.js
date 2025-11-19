const video = document.getElementById('def-camera');
const canvas = document.getElementById('lowresCanvas');
const slider = document.getElementById('slider');
const context = canvas.getContext('2d');

// モザイク
let PIXEL_DIVISOR = 30;

// 解像度変数
let MOSAIC_WIDTH;
let MOSAIC_HEIGHT;

slider.addEventListener('input', (event) => {
    const newsliderdata = parseInt  (event.target.value, 10);
    PIXEL_DIVISOR = newsliderdata;
    if (video.videoWidth > 0) {
        calculateMosaicResolution();
    }  
});

// ピクセル数計算
function calculateMosaicResolution() {
    const containerWidth = canvas.getBoundingClientRect().width;

    MOSAIC_WIDTH = Math.floor(containerWidth / PIXEL_DIVISOR); //モザイクの幅計算 

    const aspecrRatio = video.videoWidth / video.videoHeight; //アスペクト比の計算
    MOSAIC_HEIGHT = Math.floor(MOSAIC_WIDTH / aspecrRatio); //モザイクの高さの計算
    
    // 計算結果が有効かチェック
    if (isNaN(MOSAIC_HEIGHT) || MOSAIC_HEIGHT === 0) {
        return; 
    }
}

// Webカメラ処理
function startCamera() {
    const constraints = {
        audio : false,
        video : {
            width : { ideal : 9999},
            // 【修正点１】'hight' -> 'height'
            height : { ideal : 9999}, 
        }
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.error('カメラへのアクセスに失敗しました:', err);
            alert('カメラの許可が必要です。このデモはHTTPSまたはローカルサーバー経由で開いてください。');
        });
}

// 描画の開始
video.addEventListener('loadedmetadata', () => {
    // 実際に適用された解像度を確認
    const settings = video.srcObject.getVideoTracks()[0].getSettings();
    console.log(`実際に適用されたカメラ解像度: ${settings.width}x${settings.height}`);

    // canvas合わせる
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 解像度の計算
    calculateMosaicResolution();

    // ループの開始
    requestAnimationFrame(drawMosaic);
});

// 変更検知で再計算する
window.addEventListener('resize', () => {
    if (video.videoWidth > 0) {
        calculateMosaicResolution();
    }
});

// モザイク化処理
function drawMosaic() {
    if (video.paused || video.ended || !MOSAIC_WIDTH || !MOSAIC_HEIGHT) {
        requestAnimationFrame(drawMosaic); 
        return;
    }

    //アンチエイリアス無効
    context.imageSmoothingEnabled = false;

    // video要素の縮小
    // 【修正点２】'drowimage' -> 'drawImage'
    context.drawImage(video,0,0,MOSAIC_WIDTH,MOSAIC_HEIGHT);

    // 元のサイズに拡大
    // 【修正点３】'drowimage' -> 'drawImage'
    context.drawImage(
        canvas,
        0,0,MOSAIC_WIDTH,MOSAIC_HEIGHT,
        0,0,canvas.width,canvas.height,
    )
    
    requestAnimationFrame(drawMosaic);
}


// カメラ開始
startCamera();