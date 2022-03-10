# Next.js source code for Vazirmatn website

For learning Next.js SSG, Multilanguage website, GitHub actions, ...

## Install the dependencies

```shell
$ yarn 
```

## Run

```shell
$ yarn dev
```

Open url [http://localhost:3000/vazirmatn](http://localhost:3000/vazirmatn)

## Evironmental variables

Use this value from shell or a create a local file named `.env.local` in the root of website folder.

```shell
NEXT_PUBLIC_LAST_TAG_NAME= # e.g. 32.0.0
NEXT_PUBLIC_CDN_URL= # base folder including vazirmatn css files (Vazirmatn-font-face.css, ...). e.g. "https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v32.0.0/"
NEXT_PUBLIC_BASE_PATH="/vazirmatn" # will be http://localhost:3000/vazirmatn
```

## Translation
Translation files are available in `src/locales`.

License: MIT