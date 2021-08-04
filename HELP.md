<div dir="rtl">

# راهنمای فونت وزیر

## سوال و جواب

### مجوز استفاده از فونت وزیر چیست؟

فونت وزیر تا نسخه ۲۶ به صورت مالکیت عمومی و از نسخه ۲۷ همچون سایر فونت‌های منبع‌باز تحت مجوز OFL منتشر شده است.

### آدرس صفحه رسمی فونت وزیر چیست؟

در حال حاضر این آدرس است که می‌توان شکل قلم را نیز در آن مشاهده کرد:  
[https://rastikerdar.github.io/vazir-font](https://rastikerdar.github.io/vazir-font/)

### فونت وزیر از چه زبان‌هایی پشتیبانی می‌کند؟

فونت وزیر در حال حاضر (نسخه ۲۷ به بعد) از زبان‌های فارسی، عربی، کردی، پشتو، اردو، گیلکی، ازبکی و قزاقی پشتیبانی می‌کند که می‌تواند در آینده به زبان‌های دیگر نیز گسترش یابد.

### وزیر در کدام دسته فونت‌ها قرار می‌گیرد؟

در دستهٔ سنس Sans

### فونت وزیر چند حالت/وزن دارد؟

۶ وزن:

- نازک `Vazir-Thin.ttf`
- سبک `Vazir-Light.ttf`
- معمولی `Vazir.ttf`
- متوسط `Vazir-Medium.ttf`
- ضخیم `Vazir-Bold.ttf`
- سیاه `Vazir-Black.ttf`

### چگونه می‌توان لیست تغییرات یا اصلاحات فونت را بعد از هر انتشار مشاهده کرد؟

در فایل ‍`CHANGELOG.md` موجود در بستهٔ کامل و یا در این آدرس:  
[https://github.com/rastikerdar/vazir-font/blob/master/CHANGELOG.md](https://github.com/rastikerdar/vazir-font/blob/master/CHANGELOG.md)

و یا از طریق صفحه انتشار نسخه‌ها:  
[https://github.com/rastikerdar/vazir-font/releases](https://github.com/rastikerdar/vazir-font/releases)

### چگونه فونت را در سیستم‌عامل ویندوز نصب کنم؟

فایل اصلی یا فشرده را که از صفحه اصلی فونت دریافت نموده‌اید را باز کنید، سپس در ریشهٔ آن فایل‌های با پسوند ttf را باز کرده و در پنجره باز شده دکمه Install را بفشارید.

### چرا ارقام/اعداد را به صورت عربی یا لاتین نمایش می‌دهد و فارسی نمایش نمی‌دهد؟

فونت وزیر استاندارد که در ریشهٔ بستهٔ کامل قرار دارد در صورتی که ارقام را طبق استاندارد ورودی فارسی نوشته باشید به همان صورت فارسی نمایش می‌دهد. اگر شما انگلیسی یا عربی می‌بینید به این معناست که آن‌ها در هنگام نوشتن فارسی نبوده‌اند.  
فارسی: ۱۲۳۴۵۶۷۸۹۰  
عربی: ١٢٣٤٥٦٧٨٩٠  
لاتین: 1234567890  

یک فونت استاندارد نباید چیزی غیر از اصل متن را نمایش دهد و همچنین نباید اشتباهاتِ هنگام ورود و نگارش متن را اصلاح نماید.

### چرا ۱ ۲ ۳ ۷ ۸ ۹ فارسی است اما ٤ ٥ ٦ ٠ فارسی نیست؟

شکل این ارقام در عربی با فارسی متفاوت است. مثلا در عربی معمولا صفر توپُر است و در فارسی توخالی. برای فارسی بایستی اعداد با کد استاندارد فارسی نوشته شده باشند.

### برایم مهم نیست که در اصلِ متن، اعداد به صورت لاتین یا عربی نوشته‌اند. چگونه فونت وزیر را مجبور به نمایش فارسی اعداد کنم؟

در حال حاضر دو راه وجود دارد:  
- استفاده از فونت‌های موجود در پوشه `Farsi-Digits` که تمامی ارقام انگلیسی و عربی آن با فارسی بازنویسی شده‌اند. اگر چه این روش استاندارد نیست اما می‌تواند مشکل شما را حل کند.
- استفاده از Stylistic Set: کافیست اگر در برنامه مورد استفاده قابلیت تنظیم Open Type Features پشتیبانی می‌شود گزینه ss01 Farsi Digits در Stylistic Sets را انتخاب کنید و یا آنکه در محیط وب از این کد css استفاده کنید:  
```css
.sample_farsi_digits {
    -moz-font-feature-settings: "ss01";
    -webkit-font-feature-settings: "ss01";
    font-feature-settings: "ss01";
}
```

### چرا در فونت وزیر ارقام هم‌عرض نیستند؟

ارقام هم‌عرض یعنی برای مثال اندازه عرض ۱ با ۵ برابر باشد. در اینصورت عرض دو عدد زیر یکسان خواهد بود:  
۱۱۱۱۱  
۵۵۵۵۵  
این حالت بیشتر برای گزارشات مناسب است. برای نمایش ارقام هم‌عرض کافیست اگر در برنامه مورد استفاده قابلیت تنظیم Open Type Features پشتیبانی می‌شود گزینه Tabular Numeric را انتخاب کنید و یا آنکه در محیط وب از این کد css استفاده کنید:  
```css
.sample_farsi_digits {
    -moz-font-feature-settings: "tnum";
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
}
```

### چگونه در لیبره‌آفیس LibreOffice از امکان ارقام هم‌عرض و یا تمام ارقام فارسی استفاده کنم؟

در لیبره‌آفیس از منوی Format گزینه Character را انتخاب و سپس در برگه Font دکمه Features را انتخاب نمایید. دو گزینه Stylistic Set 1 و Tabular Number برای این منظور می‌باشند.

### چگونه در اینک‌اسکیپ Inkscape از امکان ارقام هم‌عرض و یا تمام ارقام فارسی استفاده کنم؟

از منوی Text گزینه Text and Font... رو انتخاب و سپس در برگه Features قسمت Numeric گزینه Tabular و یا در قسمت Feature Setting گزینه ss01 را انتخاب نمایید.

### چگونه در صفحهٔ وب با استفاده از css همزمان ارقام کاملا فارسی و هم‌عرض (با عرض یکسان) داشته باشم؟

```css
.sample_farsi_digits {
    -moz-font-feature-settings: "ss01", "tnum";
    -webkit-font-feature-settings: "ss01", "tnum";
    font-feature-settings: "ss01", "tnum";
}
```

### فونت وزیر با کدام فونت لاتین ترکیب شده است؟

با فونت Roboto از گوگل. روبوتو یک فونت آزاد است و تحت مجوز آپاچی نسخه 2 منتشر گردیده است. البته برای ترکیب، تنها گلیف‌های اصلی انگلیسی به همراه علائم استفاده شده و مابقی که شامل دیگر زبان‌های اروپایی می‌شود حذف شده‌اند.  
[https://github.com/googlefonts/roboto](https://github.com/googlefonts/roboto)

### نسخهٔ بدون حروف و علائم لاتین این فونت کجاست؟

در پوشه `Without-Latin` قرار دارند.

### چگونه فونت وزیر را با فونت دلخواهم ترکیب کنم؟

برای این کار شما باید از یک نرم‌افزار ویرایشگر فونت کمک بگیرید. برای مثال می‌توانید فونت‌فورج FontForge را نصب کرده و با آن فایل وزیر را باز نموده، سپس از منوی `Element` گزینه `Merge Fonts...` را برگزیده و با فونت دلخواه خودتان ادغام نمایید.

### چگونه اشکالات فونت وزیر را گزارش کنم یا در مورد آن پیشنهاد بدهم؟

در صورت داشتن حساب کاربری در GitHub می‌توانید در مخزن فونت درخواست خود را به صورت یک ایشو جدید درمیان بگذارید:  
[https://github.com/rastikerdar/vazir-font/issues](https://github.com/rastikerdar/vazir-font/issues)  
و یا اینکه از طریق پست الکترونیکی به اطلاع سازنده برسانید.

### چرا در برنامه‌ای که توسعه می‌دهم بالا و پایین نوشته‌ها در مقایسه با دیگر فونت‌های لاتین تراز به نظر نمی‌رسد و باید آن را تنظیم کنم؟

این مشکل معمولا در مورد فونت‌های فارسی وجود دارد. دلیلش اینست که بخش عمده‌ای از حروف فارسی مثل «ح ر ی ...» در زیر خط کرسی یا زمینه قرار دارند و همچنین به بالا و پایین حروف، اِعراب را هم باید اضافه کرد. در نتیجه حروف فارسی غالبا به فضای بیشتری نسبت به حروف لاتین برای نمایش احتیاج دارند. اما برای آن دسته از کسانی که نیاز به نسخه کوتاه دارند نسخهٔ دیگری در پوشه UI بسته قرار گرفته است که دارای ارتفاع بسیار کمتر می‌باشد.

### نسخه UI چیست؟
در این نسخه ارتفاع فونت کاسته شده است تا اختلاف ارتفاع بین لاتین و فارسی کم شود. این نسخه برای افرادی مناسب است که نیاز به چنین حالتی در رابط کاربری User Interface برنامه‌ها دارند.

### چگونه می‌توانم در میزکارهای مبتنی بر Fontconfig (بیشتر سیستم عامل‌های Unix-like)، فونت پیش‌فرض را وزیر قرار دهم؟

با پیکربندی Fontconfig می‌توانید فونت‌های پیش‌فرض میزکار را تعیین کنید. این یک نمونه پیکربندی از پیش انجام شده است که در سطح کاربر، فونت پیش‌فرض میزکار را وزیر قرار می‌دهد. می‌توانید با اصلاح این پیکربندی، فونت‌های لاتین دلخواه را در کنار فونت وزیر استفاده کنید. در این پیکربندی، فونت‌های `Vazir WOL-UI`(نسخه‌ی UI فونت Vazir بدون حروف لاتین) و [`Vazir Code WOL`](https://github.com/rastikerdar/vazir-code-font) (فونت Vazir Code بدون حروف لاتین) در کنار چند فونت لاتین مورد استفاده قرار گرفته‌اند.

<div dir="ltr">
  
```xml
~/.config/fontconfig/fonts.conf

<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM 'fonts.dtd'>
<fontconfig>
  <match target="font">
    <edit mode="assign" name="antialias">
      <bool>true</bool>
    </edit>
    <edit mode="assign" name="embeddedbitmap">
      <bool>false</bool>
    </edit>
    <edit name="autohint" mode="assign">
      <bool>true</bool>
    </edit>
    <edit mode="assign" name="hinting">
      <bool>true</bool>
    </edit>
    <edit mode="assign" name="hintstyle">
      <const>hintslight</const>
    </edit>
    <edit mode="assign" name="lcdfilter">
      <const>lcddefault</const>
    </edit>
    <edit mode="assign" name="rgba">
      <const>rgb</const>
    </edit>
  </match>
  
  <!-- Default sans-serif font -->
  <match target="pattern">
    <test qual="any" name="family"><string>sans-serif</string></test>
    <edit name="family" mode="prepend" binding="same"><string>Vazir WOL-UI</string></edit>
    <edit name="family" mode="append" binding="same"><string>Roboto</string></edit>
  </match>

  <!-- Default serif fonts -->
  <match target="pattern">
    <test qual="any" name="family"><string>serif</string></test>
    <edit name="family" mode="prepend" binding="same"><string>Vazir WOL-UI</string></edit>
    <edit name="family" mode="append" binding="same"><string>DejaVu Serif</string></edit>
  </match>


  <!-- Default monospace fonts -->
  <match target="pattern">
    <test qual="any" name="family"><string>monospace</string></test>
    <edit name="family" mode="prepend" binding="same"><string>Vazir Code WOL</string></edit>
    <edit name="family" mode="append" binding="same"><string>Inconsolata</string></edit>
  </match>


  <!-- Fallback fonts preference order -->
  <alias>
    <family>sans-serif</family>
    <prefer>
      <family>Vazir WOL-UI</family>
      <family>Roboto</family>
    </prefer>
  </alias>

  <alias>
    <family>serif</family>
    <prefer>
      <family>Vazir WOL-UI</family>
      <family>DejaVu Serif</family>
    </prefer>
  </alias>

  <alias>
    <family>monospace</family>
    <prefer>
      <family>Vazir Code WOL</family>
      <family>Inconsolata</family>
    </prefer>
  </alias>

</fontconfig>
```
</div>

</div>
