# Vazir-Font
A Persian (Farsi) Font
<div dir="rtl">
فونت فارسی وزیر

[نمایش فونت](http://rastikerdar.github.io/vazir-font/)

با تشکر از برنامه [FontForge](https://fontforge.github.io)

بر مبنای فونت [DejaVu Sans 2.35](http://dejavu-fonts.org)


طریقه استفاده در صفحات وب:
--------------------------
<div lang="fa" dir="rtl">
کد زیر را در قسمت style یا فایل css وارد نمایید:
</div>


```
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


توضیحاتی در مورد مجوز:
----------------------
<div lang="fa" dir="rtl">
فونت DejaVu Sans 2.35 بر مبنای Vera Fonts ایجاد شده که در واقع حجم انبوهی از گلیف های گوناگون را به آن اضافه نموده است. فونت Vera با مجوز آزاد Bitstream Vera منتشر گردیده اما تغییرات فونت توسط DejaVu شامل گلیف های اضافی از جمله عربی/فارسی به صورت Public Domain منتشر گردیده است. در آخر نیز تمامی تغییراتی که فونت وزیر بر روی فونت DejaVu یا به طور دقیق تر بر روی گلیف های عربی/فارسی اعمال نموده تحت مجوز آزاد SIL Open Font License 1.1 منتشر می گردد.
</div>
