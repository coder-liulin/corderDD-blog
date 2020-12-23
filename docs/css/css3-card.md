---
id: css3-card
title: CSS3实现卡片翻牌效果
---

1. backface-visibility:<hide | visible> 隐藏被旋转的 div 元素的背面；
2. transform-style：<preserve-3d | flat> 使被转换的子元素保留其 3D 转换
3. background-size:<cover|contain|100%> 
4. cover:是背景图片完全覆盖背景区域
5. contain:把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域 百分比：设置图片的宽高比例
6. 相关代码

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>卡片旋转特效</title>
  <style>
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    html,
    body {
      width: 100%;
      height: 100%;
      font-size: 18px;
      line-height: 1.5;
      font-weight: 300;
      color: #333;
      font-family: "Nunito Sans", sans-serif;
    }

    body {
      margin: 0px;
      background: #ecf0f9;
    }

    .content {
      width: 80%;
      height: 100%;
      margin-left: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }

    .card {
      width: calc(33%-2rem);
      min-width: calc(33% - 2rem);
      height: 400px;
      margin: 1rem;
      color: inherit;
      cursor: pointer;
      perspective: 1000px;
      position: relative;
    }

    .front,
    .back {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      background-size: cover;
      transform-style: preserve-3d;
      transition: ease-in-out 600ms;
      display: flex;
      background-position: center;
      position: absolute;
      text-align: center;
      justify-content: center;
      align-items: center;
    }

    .front {
      background-size: cover;
      color: #fff;
      overflow: hidden;
      padding: 2rem;
      font-size: 1.618rem;
      font-weight: 600;
    }

    .front::before {
      position: absolute;
      content: '';
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      /* background: linear-gradient(135deg, #1a9be6, #1a57e6); */
      opacity: .25;
    }

    .card:hover .front {
      transform: rotateY(180deg);
    }

    .card:nth-child(even):hover .front {
      transform: rotateY(-180deg);
    }

    .back {
      background: #fff;
      transform: rotateY(-180deg);
      padding: 0 2em;
    }

    .card:hover .back {
      transform: rotateY(0deg);
    }

    .card:nth-child(even) .back {
      transform: rotateY(180deg);
    }

    .card:nth-child(even):hover .back {
      transform: rotateY(0deg);
    }

    .button {
      transform: translateZ(40px);
      cursor: pointer;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      font-weight: bold;
      color: #fff;
      padding: .5em 1em;
      border-radius: 100px;
      font: inherit;
      background: linear-gradient(135deg, #1a9be6, #1a57e6);
      border: none;
      position: relative;
      transform-style: preserve-3d;
      transition: 300ms ease;
      outline: none;
      /* box-shadow: 10px 10px 20px #c2c2c2; */
    }

    /* .button:active {
      box-shadow: 5px 5px 10px #ccc;
    } */

    .button:before {
      transition: 300ms ease;
      position: absolute;
      display: block;
      content: '';
      transform: translateZ(-40px);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      height: calc(100% - 20px);
      width: calc(100% - 20px);
      border-radius: 100px;
      left: 10px;
      top: 16px;
      box-shadow: 0 0 10px 10px rgba(26, 87, 230, 0.25);
      background-color: rgba(26, 87, 230, 0.25);
    }

    .button:hover {
      transform: translateZ(55px);
    }

    .button:hover:before {
      transform: translateZ(-55px);
    }

    .button:active {
      transform: translateZ(20px);
    }

    .button:active:before {
      transform: translateZ(-20px);
      top: 12px;
    }
  </style>
</head>

<body>
  <div class="content">
    <a class="card">
      <div class="front" style="background-image:url(http://demo.lanrenzhijia.com/demo/61/6124/demo/img/559.jpg)">
        <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
      </div>
      <div class="back">
        <div>
          <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
          <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
          <button class="button">Click Here</button>
        </div>
      </div>
    </a>
    <a class="card">
      <div class="front" style="background-image:url(http://demo.lanrenzhijia.com/demo/61/6124/demo/img/559.jpg)">
        <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
      </div>
      <div class="back">
        <div>
          <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
          <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
          <button class="button">Click Here</button>
        </div>
      </div>
    </a>
    <a class="card">
      <div class="front" style="background-image:url(http://demo.lanrenzhijia.com/demo/61/6124/demo/img/559.jpg)">
        <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
      </div>
      <div class="back">
        <div>
          <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
          <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
          <button class="button">Click Here</button>
        </div>
      </div>
    </a>
    <a class="card">
      <div class="front" style="background-image:url(http://demo.lanrenzhijia.com/demo/61/6124/demo/img/559.jpg)">
        <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
      </div>
      <div class="back">
        <div>
          <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
          <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
          <button class="button">Click Here</button>
        </div>
      </div>
    </a>
  </div>
</body>

</html>
```
