"use strict";

window.addEventListener("DOMContentLoaded",
    function() {

        // ヘッダーのテキストエフェクト
        $("header").textillate({
            loop: false, // ループのオンオフ
            minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
            initialDelay: 2000, // 遅延時間
            autoStart: true, // アニメーションを自動的にスタート
            in: { // フェードインのエフェクトの詳細設定

             effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
             delayScale: 1.5, // 遅延時間の指数
             delay: 50, // 文字ごとの遅延時間
             sync: false, // trueはアニメーションをすべての文字に同時に適用
             shuffle: true // trueは文字を順番にではなく、ランダムに
            }
        });
        // おみくじボタン(id="btn1") ボヤァと表示させる
        $(function(){
         ScrollReveal().reveal("#btn1", { duration: 9000 });
        });

     //POPUP MESSAGE
         let popMessage = "いらっしゃい！スペース引いてって！";
         window.alert(popMessage);
},false

);
//omikuji button1
let soundEndflag = "0";
const btn1 = document.getElementById("btn1");
const omikujiText =document.getElementById("omikujiText");
btn1.addEventListener("click",
    function() {
        if(soundEndflag === "1"){
            soundControl("end","");
        }
        let resultText = ["メテオ!!!!","星","流星","宇宙飛行士"];
        let resultSound = ["sound/Door1.mp3","sound/Door2.mp3","sound/Door3.mp3","sound/Door4.mp3",];
        let resultColor = ["#ff0000","#c71585","#ff1493","#ff69b4"];
        let resultFontSize = ["80px","60px","60px","50px"];
        let resultMaxSpeed =[10,10,8,5,5,5];
        let resultImage = ["img/meteor.png","img/star.png","img/stars.png","img/astronaut.png"];
        
        
        let n = Math.floor(Math.random() * resultText.length);
        omikujiText.textContent = resultText[n];
        omikujiText.style.color = resultColor[n];
        omikujiText.style.fontSize = resultFontSize[n];

        w_sound = resultSound[n];
        soundControl("start",w_sound);
        soundEndflag = "1";

        $(document).snowfall("clear");
        setTimeout(
            function(){

             // jQueryのsnowfall
                $(document).ready(function(){
                 $(document).snowfall({
                 maxSpeed : resultMaxSpeed[n], // 最大速度
                 minSpeed : 1, // 最小速度
                 maxSize : 21, // 最大サイズ
                 minSize : 2, // 最小サイズ
                 image : resultImage[n]
                });
              });
            },
            "200"
        );
    }, false
 );
 let w_sound
 let music
 function soundControl(status,w_sound){
     if(status === "start"){
         music = new Audio(w_sound);
         music.currentTime = 0;
         music.play();
     }else if(status === "end"){
         music.pause();
         music.currentTime = 0;
     }
 }