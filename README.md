# Vazir-Font
A Persian (Farsi) Font

[![Build Status](https://travis-ci.org/rastikerdar/vazir-font.svg?branch=master)](https://travis-ci.org/rastikerdar/vazir-font)
[![npm version](https://badge.fury.io/js/vazir-font.svg)](https://badge.fury.io/js/vazir-font)


<p dir="rtl">
فونت فارسی وزیر <br />

<a href="http://rastikerdar.github.io/vazir-font/">نمایش فونت</a> <br />
<a href="https://github.com/rastikerdar/vazir-font/releases">صفحه دریافت (دانلود) بسته فونت شامل فایل های ttf,woff,eot</a> <br />

با تشکر از برنامه <a href="https://fontforge.github.io">FontForge</a><br />

بر مبنای فونت <a href="http://dejavu-fonts.org">DejaVu Sans 2.35</a>

</p>
<p lang="fa" dir="rtl" align="right">
نسخه های بدون حروف لاتین یا تمام ارقام فارسی درون بسته فشرده موجود می‌باشد.
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
```

## Install

#### Download
Grab the [latest release](https://github.com/rastikerdar/vazir-font/releases/latest) file.

#### Bower
```
bower install vazir-font --save
```

#### npm
```
npm install vazir-font
```
Fonts will be copied to `npm_modules/vazir-font/dist` directory

#### CDN
Link fonts from the [RawGit](https://rawgit.com) CDN:

```html
<link href="https://cdn.rawgit.com/rastikerdar/vazir-font/v[X.Y.Z]/dist/font-face.css" rel="stylesheet" type="text/css" />
```

Replace [X.Y.Z] with the latest version (e.g. 9.0.0-beta) and integrate the font into your CSS:

```
font-family: 'Vazir', sans-serif;
```

#### Homebrew
You can install the font on macOS machines by tapping the caskroom/fonts repo:  

```shell
brew tap caskroom/fonts
brew install font-vazir
```

#### Arch Linux
Arch user's could use [vazir-fonts](https://aur.archlinux.org/packages/vazir-fonts/) package from [AUR](https://aur.archlinux.org/) repository to install vazir font.
Use your favourite [AUR helper](https://wiki.archlinux.org/index.php/AUR_helpers) like pacaur or yaourt for installing package:

```shell
pacaur -S vazir-fonts
```

