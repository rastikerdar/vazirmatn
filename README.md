# Vazir-Font
A Persian (Farsi) Font

<p dir="rtl">
فونت فارسی وزیر <br />

<a href="http://rastikerdar.github.io/vazir-font/">نمایش فونت</a> <br />

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
```

