# TsShoppy

## 배포 주소

<a>https://tsshoppy.vercel.app/</a>

## 프로젝트 소개

TypeScript와 React를 이용한 의류 쇼핑몰 웹앱입니다.
JavaScript로만 작업을 하고 있었는데 기업에서 요구하는 스펙 중에 TypeScript가 빠지지 않고 들어가 있었습니다.
TypeScript를 사용하면 버그가 15% 줄일 수 있다는 연구발표가 흥미로웠고 VSCode와 잘 호환되어 쉽게 코딩을 할 수 있다고 하여 TypeScript를 사용해 보았습니다.

## 시작 가이드

### 요구사항

내 환경

-   Node.js 18.12.0
-   yarn 1.22.19
-   npm 8.19.2

설치

```bash
$ git clone https://github.com/tmdgus95/tsshoppy.git
```

```
$ npm install or yarn install
$ npm start or yarn start
```

## Stack 🧹

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Development

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=61DAFB)
![ReactQuery](https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=61DAFB)

## 화면 구성 🖥️

|                             메인 페이지                              |                                구글 로그인                                |
| :------------------------------------------------------------------: | :-----------------------------------------------------------------------: |
|     <img width="329" src="/public/images/README/메인화면.png"/>      |       <img width="329" src="/public/images/README/소셜로그인.png"/>       |
|                           장바구니 페이지                            |                            제품 디테일 페이지                             |
| <img width="329" src="/public/images/README/장바구니%20페이지.png"/> | <img width="329" src="/public/images/README/제품%20디테일%20페이지.png"/> |

## 주요 기능 📦

### ⭐️ 어드민 계정 기능

-   어드민 계정을 구분 가능
-   어드민 계정은 판매 의류 추가 가능

### ⭐️ 장바구니 기능

-   사고 싶은 의류를 장바구니에 추가 가능
-   장바구니에서 물품 수량 변경, 삭제 가능

## 프로젝트 후기

### ♨️로그인 부터 문제

-   로그인을 하면 서버에서 응답으로 많은 데이터를 넘겨주지만 내가 사용하고 싶은 데이터가 몇 개 없음에도 불구하고 데이터에 타입을 지정해 줘야 한다고 해서 처음에는 막막했지만 일단 이번 프로젝트에서 필요한 데이터에만 타입을 지정해둠 유저 관련해서는 any를 쓰게 됨

```
export function onUserStateChange(callback: any) {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser);
    });
}

async function adminUser(user: any) {
    return get(ref(database, 'admins')).then((snapshot) => {
        if (snapshot.exists()) {
            const admins = snapshot.val();
            const isAdmin = admins.includes(user.uid);
            return { ...user, isAdmin };
        }
        return user;
    });
}
```

-   JavaScript랑 사소한 부분에서 차이가 좀 있어서 처음에는 많이 헤매었다. 리턴 값으로 그냥 children만 써놓을 경우 에러를 주는 바람에 JavaScript에서는 문제가 없었는데 자꾸 문제를 주니 더 혼란스러웠다.

```
export default function ProtectedRoute({ children, requireAdmin }: Props) {
    const user = useSelector((state: RootState) => state.user);
    if (!user.displayName || (requireAdmin && !user.isAdmin)) {
        return <Navigate to='/' replace />;
    }

    return <>{children}</>;
}
TypeScript
```

```
export default function ProtectedRoute({ children, requireAdmin }) {
    const { user } = useAuthContext();
    if (!user || (requireAdmin && !user.isAdmin)) {
        return <Navigate to='/' replace />;
    }
    return children;
}
JavaScript
```

-   TypeScript는 엄격하다. option이야 타입 지정해 주지 않으면 경고를 줄 수 있다고 생각했지만 2번째 인자인 index는 무조건 숫자여서 타입 추론을 해줄 거라고 생각했지만 index에도 타입을 지정해 줘야 했다
    ```
    {options &&
                          options.map((option: string, i: number) => (
                              <option key={i}>{option}</option>
                          ))}
    ```
-   TypeScript를 사용하려면 JavaScript에대해 잘 알고 있어야 한다. Axios같은 라이브러리를 이용하고 async await 같은 편리한 기능이 있다보니 Promise에 대해 소흘히 생각하고 있었는데 TypeScript를 이용해서 코딩을 하려면 리턴타입에 대해서도 잘 생각해야기 때문이다.

```
export async function getCart(userId: string): Promise<CartProduct[]> {
    return get(ref(database, `carts/${userId}`)).then((snapshot) => {
        const items = snapshot.val() || {};
        return Object.values(items);
    });
}

export async function getProducts(): Promise<Product[]> {
    return get(ref(database, 'products')).then((snapshot) => {
        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        }
        return [];
    });
}
```
