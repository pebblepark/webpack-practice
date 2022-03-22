# Webpack

[웹팩 핸드북 참고](https://joshua1988.github.io/webpack-guide/guide.html)

- 최신 프론트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러(Module Bundler)

- **모듈 번들러** : 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javscript, Images 등)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구

- **모듈** : 프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위

- **웹팩에서의 모듈** : 자바스크립트 모듈에만 국한되지 않고 웹 애플리케이션을 구성하는 모든 자원을 의미

  - HTML, CSS, Javascript, Images, Font 등

- **모듈 번들링**: 웹 애플리케이션을 구성하는 몇십, 몇백개의 자원들을 하나의 파일로 병합 및 압축 해주는 동작

<br />

## Concepts

- [entry](#entry)
- [output](#output)
- [loader](#loader)
- plugin

<br />

### Entry

`entry` 속성은 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로

```js
// webpack.config.js
module.exports = {
  entry: "./src/index.js",
};
```

해당 코드는 웹팩 실행 시 `src` 폴더 밑에 `index.js` 를 대상으로 웹팩이 빌드를 수행한다.

<br />

_SPA의 한 예제_

```jsx
// index.js
import LoginView from "./LoginView.js";
import HomeView from "./HomeView.js";
import PostView from "./PostView.js";

function initApp() {
  LoginView.init();
  HomeView.init();
  PostView.init();
}

initApp();
```

- 사용자 로그인 화면, 로그인 후 진입하는 메인화면, 게시글 작성 화면이 `index.js` 파일에서 불려져 사용되고 있다.
- 웹팩 실행시 해당 파일들의 내용까지 해석해 파일을 빌드한다.

```
webpack -build-> index.js - LoginView.js
                          - HomeView.js
                          - PostView.js
```

> 모듈 간의 의존관계가 생기는 구조 : Dependency Graph

<br />

**Entry 유형**

- entry 포인트는 여러개가 될 수 있다.

```js
entry: {
  login: './src/LoginView.js',
  main: './src/MainView.js'
}
```

엔트리 포인트를 분리하는 경우는 SPA가 아닌 특정 페이지에 진입했을 때 서버에서 해당 정보를 내려주는 멀티 페이지 애플리케이션에 적합하다.

<br />
<br />

### Output

`output` 속성은 웹팩을 돌리고 난 결과물의 파일 경로

**Output 속성 옵션 형태**

- 최소 `filename`은 지정 필요
- 일반적으로 아래와 같이 `path` 속성을 함께 정의

```js
// webpack.config.js
var path = require("path");

module.exports = {
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
};
```

- `filename` : 웹팩으로 빌드한 파일의 이름
- `path` : 해당 파일의 경로를 의미

_`path.resolve()`_

- 인자로 넘어온 경로들을 조합하여 유효한 파일 경로를 만들어주는 Node.js API
- 해당 결과: `output: "./dist/bundle.js"`
- [path.resolve 더 알아보기](https://www.hanumoka.net/2018/11/08/node-20181108-node-path-join-vs-resolve/)

<br />

**Output 파일 이름 옵션**

`filename` 속성에 여러 옵션을 넣을 수 있다.

1. 결과 파일 이름에 `entry` 속성 포함

```js
module.exports = {
  output: {
    filename: "[name].bundle.js",
  },
};
```

2. 결과 파일 이름에 웹팩 내부적으로 사용하는 모듈 ID 포함

```js
module.exports = {
  output: {
    filename: "[id].bundle.js",
  },
};
```

3. 매 빌드시마다 고유 해시 값 붙이기

```js
module.exports = {
  output: {
    filename: "[name].[hash].bundle.js",
  },
};
```

4. 웹팩의 각 모듈 내용을 기준으로 생성된 해시 값 붙이기

```js
module.exports = {
  output: {
    filename: "[chunkhash].bundle.js",
  },
};
```

<br />
<br />

### Loader

`Loader`는 웹팩이 웹 애플리케이션을 해석할 때 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, Images, font 등)들을 변환할 수 있도록 도와주는 속성

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [],
  },
};
```

> 엔트리나 아웃풋 속성과 달리 `module` 이라는 이름 사용

<br />
