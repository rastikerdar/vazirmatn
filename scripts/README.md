# Font Builder

The script tool for building files for [vazir-font](https://github.com/rastikerdar/vazir-font).

## Requirements

- fontforge  https://fontforge.org/
- python3
- python3-fontforge
- fontmake  https://github.com/googlefonts/fontmake
- ttfautohint  https://www.freetype.org/ttfautohint/
- sfnt2woff-zopfli  https://github.com/bramstein/sfnt2woff-zopfli
- mkeot  https://www.w3.org/Tools/eot-utils/
- woff2_compress  https://github.com/google/woff2
- zip

## How it works

``` 
git clone https://github.com/rastikerdar/vazir-font.git
cd vazir-font/
./scripts/makefont .
or 
bash ./scripts/makefont .
```

Thanks [github.com/alif-type/amiri](https://github.com/alif-type/amiri) for his very helpful tools.

License: MIT
