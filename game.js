import { img_arr, name_arr } from './pengin.js';
// 開始時間
let startTime;
// 経過秒数用 タイマーID
let timer;
// カードめくり用 タイマーID(動作中はカードがめくれないように)
let backTimer;
// 1枚目かどうかのフラグ(1枚目: true 2枚目: false)
let flgFirst = true;
// 1枚目のカードを格納
let cardFirst;
// そろえた枚数(ペアができるたびに+1 10ペアで終了)
let countUnit = 0;
// 時間を保存しておく(表示)
let elapsedTime_str
// explainの要素取得
const explain = document.getElementById('explain');
// ゲームカードの枚数
const game_card = 9;



let img_tag_arr = [];
for (let i = 0; i < img_arr.length; i++ ){
    img_tag_arr.push("<img src='img/" + img_arr[i] + ".png'>")
}


window.onload = function () {

    const arr = [];
    let arr_int = [];
    for (let i = 0; i < img_arr.length; i++) {
        arr_int.push(i);
    }  //[0,1,2,3,4,5,,6,7,8,9] 要素数はペンギンの数の2倍
 
    shuffle(arr_int);// シャッフル [1,7,3,4,5......]

    for (let i = 0; i < game_card; i++) {
        arr.push(arr_int[i]);
        arr.push(arr_int[i]);
    }
    shuffle(arr); // シャッフル [1,1,7,7,3,3,4,4,5,5......]


    let game_board = document.getElementById('game_board');

    // div要素作成(カード)
    for (let i = 0; i < 2 * game_card; i++) {
        let div = document.createElement('div');
        div.className = 'card back'; //カードの裏側を表示
        div.number = arr[i]; //プロパティを設定
        //console.log(Object.keys(div));
        //console.log(Object.values(div));
        div.onclick = turn;
        game_board.appendChild(div);
    }
    startTime = new Date(); // 開始時刻を取得
    startTimer(); // タイマー開始
}
//シャッフル用関数
function shuffle(arr) {
    let n = arr.length;
    while (n) { //nが0になったら終了      ここで毎回-1
        let i = Math.floor(Math.random() * n--);
        [arr[n], arr[i]] = [arr[i], arr[n]]
    }
    return arr;
}
// カードクリック時の処理
function turn(e) {
    let div = e.target; //クリックしたカード
    document.getElementById('audio').pause();
    document.getElementById('audio').play();
    // カードのタイマー処理が動作中は return
    if (backTimer) return; //連続で押せないように
    // 裏向きのカードをクリックした場合は画像を表示する
    if (div.innerHTML == '') {
        div.className = 'card'; //backというクラス名を取り除いた
        div.innerHTML = img_tag_arr[div.number];
    } else {
        return // 数字が表示されているカードは return
    }
    if (flgFirst) { // 1枚目の処理 一枚目ならtrue
        cardFirst = div;  //最初にクリックしたカード
        flgFirst = false; //次は２枚目だから
    } else { // ２枚目の処理
        if (cardFirst.number == div.number) {
            countUnit++; //揃ったペアの数
            backTimer = setTimeout(function () {
                div.className = 'card finish'; //1秒で透明
                cardFirst.className = 'card finish';
                backTimer = NaN;
                // ここにペンギンの名前を表示する処理を追加
                explain.innerHTML = name_arr[cardFirst.number];

                alert(name_arr[cardFirst.number])
                if (countUnit == game_card) { //すべて揃ったら（表にした枚数と画像配列の長さが一致したら）
                    clearInterval(timer);  // timer終了
                    alert("スコアは" + elapsedTime_str + "点です")
                }
            }, 1000)
        } else {
            backTimer = setTimeout(function () {
                div.className = 'card back';
                div.innerHTML = ''; // カードを裏側に戻す
                cardFirst.className = 'card back';
                cardFirst.innerHTML = '';
                cardFirst = null;
                backTimer = NaN;
            }, 1000);
        }
        flgFirst = true;
    }
}

//時間切れ処理
function Timeup(){
    // modalの要素取得
    const screen = document.getElementById('screen');
    const endmodal = document.getElementById('endmodal'); 
    endmodal.style.display = "block";
    screen.style.display = "block";
}

// タイマー開始
function startTimer() {
    timer = setInterval(showSecond, 100);
}
// 秒数表示
function showSecond() {
    let nowTime = new Date();
    if (nowTime - startTime < 9100){
        //経過時間ミリ秒を1000で割って秒に戻し、toFixedで桁数指定した文字列を返す
        elapsedTime_str = ((nowTime - startTime)/1000).toFixed(1); 
        let str  = elapsedTime_str + '';
        let re = document.getElementById('result');
        re.innerHTML = str;
    }else{
        Timeup()
    }
    
    
}

