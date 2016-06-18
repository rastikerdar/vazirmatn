# Vazir-Font
A Persian (Farsi) Font

<p dir="rtl">
فونت فارسی وزیر <br />

<a href="http://rastikerdar.github.io/vazir-font/">نمایش فونت</a> <br />
<a href="https://github.com/rastikerdar/vazir-font/releases">صفحه دریافت (دانلود) بسته فونت شامل فایل های ttf,woff,eot</a> <br />

با تشکر از برنامه <a href="https://fontforge.github.io">FontForge</a><br />

بر مبنای فونت <a href="http://dejavu-fonts.org">DejaVu Sans 2.35</a>

</p>


<h1 dir="rtl">
طریقه استفاده در صفحات وب:
</h1>

<p dir="rtl">
کد زیر را در قسمت style یا فایل css وارد نمایید:
</p>


```css
@font-face {
  font-family: Vazir;
  src: url('Vazir.eot');
  src: url('Vazir.eot?#iefix') format('embedded-opentype'),
       url('Vazir.woff') format('woff'),
       url('Vazir.ttf') format('truetype');
  font-weight: normal;
}
      
@font-face {
  font-family: Vazir;
  src: url('Vazir-Bold.eot');
  src: url('Vazir-Bold.eot?#iefix') format('embedded-opentype'),
       url('Vazir-Bold.woff') format('woff'),
       url('Vazir-Bold.ttf') format('truetype');
  font-weight: bold;
}

@font-face {
  font-family: Vazir;
  src: url('Vazir-Light.eot');
  src: url('Vazir-Light.eot?#iefix') format('embedded-opentype'),
       url('Vazir-Light.woff') format('woff'),
       url('Vazir-Light.ttf') format('truetype');
  font-weight: 300;
}

@font-face {
  font-family: Vazir;
  src: url('Vazir-Medium.eot');
  src: url('Vazir-Medium.eot?#iefix') format('embedded-opentype'),
       url('Vazir-Medium.woff') format('woff'),
       url('Vazir-Medium.ttf') format('truetype');
  font-weight: 500;
}
```

## Install

Grab the [latest release](https://github.com/rastikerdar/vazir-font/releases/latest) file.

Or you can get it on bower:

```
bower install vazir-font --save
```

Or [RawGit](https://rawgit.com) CDN:

```html
<link href="https://cdn.rawgit.com/rastikerdar/vazir-font/v[X.Y.Z]/dist/font-face.css" rel="stylesheet" type="text/css" />
```

Replace [X.Y.Z] with the latest version (e.g. 3.0.0) and integrate the font into your CSS:

```
font-family: 'Vazir', sans-serif;
```

