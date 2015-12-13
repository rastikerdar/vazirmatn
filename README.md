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


<h1 dir="rtl">
توضیحاتی در مورد مجوز:
</h1>
<div dir="rtl">
فونت DejaVu Sans 2.35 بر مبنای Vera Fonts ایجاد شده که در واقع حجم انبوهی از گلیف های گوناگون را به آن اضافه نموده است. فونت Vera با مجوز آزاد Bitstream Vera منتشر گردیده اما تغییرات فونت توسط DejaVu شامل گلیف های اضافی از جمله عربی/فارسی به صورت Public Domain منتشر گردیده است. در آخر نیز تمامی تغییراتی که فونت وزیر بر روی فونت DejaVu یا به طور دقیق تر بر روی گلیف های عربی/فارسی اعمال نموده تحت مجوز آزاد SIL Open Font License 1.1 منتشر می گردد.
</div>
