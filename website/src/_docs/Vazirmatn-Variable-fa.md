---
title: 'راهنمای فونت وزیرمتن وریبل یا متغیر (Variable)'
date: '2022-04-18T09:41:38Z'
author: 'Saber Rastikerdar'
---

## فونت متغیر چیست؟

فونت متغیر نسخه تکامل یافته فونت‌های معمولی (اوپن‌تایپ) است که می‌تواند حالت‌‌های مختلف یک تایپ‌فیس را درون یک فایل جای دهد و کاربر تنها از یک فایل به جای استفاده از فایل‌های مختلف به ازای هر حالت استفاده می‌کند. برای مثال یک فونت وریبل می‌تواند وزن‌های معمولی و ضخیم، حالت ایتالیک، فشرده، عریض و ... را یکجا شامل گردد. در حالی که به روال سابق ما مجبور بودیم چندین فایل را برای بهره‌مندی از این حالات به کار بگیریم.

## فایل‌های فونت وزیرمتن متغیر

نسخه‌های مختلف متغیر وزیرمتن در آدرس‌های زیر قرار دارند:

### نسخه معمولی:
- `fonts/variable/Vazirmatn[wght].ttf`
- `fonts/webfonts/Vazirmatn[wght].woff2`

### نسخه نقطه‌گرد:
- `Round-Dots/fonts/variable/Vazirmatn-RD[wght].ttf`
- `Round-Dots/fonts/webfonts/Vazirmatn-RD[wght].woff2`

### نسخه بدون لاتین:
- `misc/Non-Latin/fonts/variable/Vazirmatn-NL[wght].ttf`
- `misc/Non-Latin/fonts/webfonts/Vazirmatn-NL[wght].woff2`

هر کدام از این فایل‌ها تمامی وزن‌های وزیرمتن را یکجا شامل می‌شوند.

## نحوه استفاده از فونت وزیرمتنِ متغیر در وب

برای تعریف فونت در CSS:
```css
@font-face {
  font-family: Vazirmatn;
  src: url('fonts/webfonts/Vazirmatn[wght].woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

برای نسخه نقطه گرد:
```css
@font-face {
  font-family: Vazirmatn RD;
  src: url('Round-Dots/fonts/webfonts/Vazirmatn-RD[wght].woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

هر چند که در آدرس ریشه، فایل `Vazirmatn-Variable-font-face.css` برای استفاده از نسخه وب قرار داده شده است که می‌توانید آن را مستقیما و یا از طریق CDN فرا بخوانید:
```html
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v32.102/Vazirmatn-Variable-font-face.css" rel="stylesheet" type="text/css" />
```

در نظر داشته باشید که همیشه از آخرین نسخه به جای عدد ورژن v32.102 استفاده کنید.


نحوه استفاده در css بدین صورت است:
```css
body {
    font-family: Vazirmatn;
    font-variation-settings: "wght" 400;
}

h1 {
    font-variation-settings: "wght" 900;
}
```
در وزیرمتن، پارامتر `wght` برای تغییر وزن فونت تعریف شده است. در این کد به جای 900 هر عددی از 100 تا 900 قابل استفاده می‌باشد. مثلا 627.