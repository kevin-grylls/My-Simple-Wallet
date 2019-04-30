##### My Simple Wallet

---

###### Preparation before you go

- 소스코드를 클론 후 의존성 설치

```sh
$ npm i
```

- EVM 노드와 장고 서버를 기동합니다.
- 프론트엔드 앱도 기동합니다.

```sh
$ npm run dev
```

- 웹앱은 3000 포트로 기동하며, 8000 포트의 장고 서버와 연동합니다.

- 헤더와 API, 스트링 타입은 ~/config/\*.json 에서 변경합니다.

---

- Summary
  - GUI 환경에서 사용자 계정을 만듭니다.
  - 계정 조회 -> 마이닝 -> 언락 -> 디플로이 -> CA 취득을 시행 합니다.
  - 에어 드랍을 통해 토큰 할당 후 참여자간 토큰 전송을 테스트 합니다.

---

1. 지갑 생성

- 초기 메인화면으로 들어갑니다.

<img src='https://user-images.githubusercontent.com/21056590/56851948-c500af00-694f-11e9-9922-681f1e6d0bad.png' />

- 상단 헤더의 계정생성 메뉴로 이동합니다.

<img src='https://user-images.githubusercontent.com/21056590/56851998-55d78a80-6950-11e9-9500-904a281da440.png' />

- 테스트에 필요한 지갑을 생성합니다.
- 초기 EVM 기준, 첫번째 계정은 eth.coinbase 로 지정됩니다.

2. 배포 실행

- 배포 페이지로 이동합니다.
- 계정이 성공적으로 생성되었다면 계정 목록이 화면에 로드되어 있는 걸 볼 수 있습니다.

<img src='https://user-images.githubusercontent.com/21056590/56852696-6809f680-6959-11e9-83df-b343244b05e6.png'>

- 상단의 스텝바는 스마트 컨트랙트 배포까지의 프로세스 진행도를 나타냅니다.
- 레드 박스는 마이닝 상태를 나타냅니다.
- 채굴을 하지 않기 때문에 DISABLE MINING 표기 된 것을 볼 수 있습니다.
- 코인베이스로 지정된 계정도 없어서 디플로이 버튼도 볼 수 없습니다.
- 그러면 첫번째 계정인 Kevin 을 코인베이스로 지정 후 다시 확인해 보겠습니다.

```sh
$ eth.accounts
["0xe42b698057057bca53d88d78c29fdec1763157f2", "0xb9bf85adac93fa0bb529141d62029e607adb253a", "0x35188048525f1070105f96838ddfd72fd4f54787", "0x8d2f38cf1f501e42f612dd988eade8cb8d811330", "0x2c7f35a63c3dd3c21b62e752475f6375a4703ccb"]
$ miner.setEtherbase(eth.accounts[1])
true
$ eth.coinbase
"0xb9bf85adac93fa0bb529141d62029e607adb253a"
```

- 다시 한번 배포 페이지로 들어가 보겠습니다.

<img src='https://user-images.githubusercontent.com/21056590/56852831-fe8ae780-695a-11e9-913f-03fb765282e1.png'>

- 이번에는 코인베이스 계정이 있기 때문에 DEPLOY 버튼이 활성화 된 것을 볼 수 있습니다.
- 먼저 채굴을 활성화하기 위해 빨간색 DISABLE MINING 버튼을 눌러줍시다.

<img src='https://user-images.githubusercontent.com/21056590/56852921-0c8d3800-695c-11e9-8064-d5790c8dd90b.png'>

- EVM 노드가 채굴을 시작하자 빨간색 버튼이 파란색으로 바뀌면서 노드가 채굴 중임을 알려줍니다.
- 다음은 UNLOCK ACCOUNT 를 눌러줍니다.
- 잠시후 메시지를 확인하고 DEPLOY 를 실행해서 스마트 컨트랙트를 배포해 줍니다.

<img src='https://user-images.githubusercontent.com/21056590/56853010-2f6c1c00-695d-11e9-9eb7-8f2c9e46ff44.png'>

- 컨트랙트 배포가 완료되면, CA 값과 배포시간을 확인할 수 있습니다.
- CA 값은 브라우저 캐시로 저장되나, 차후 테스트를 위해 따로 저장해 두는 것을 권장합니다.

3. 트랜잭션 

- 이제 트랜잭션 페이지로 이동합니다.

<img src='https://user-images.githubusercontent.com/21056590/56853058-b4efcc00-695d-11e9-9c55-a8450dd40f9a.png'>

- 회원 지갑 아이디와 주소, 잔액을 확인할 수 있습니다.
- 토큰 홀더가 모든 토큰을 가지고 있는 상태이므로, 지금부터 에어드랍을 통해 토큰을 나눠주겠습니다.

<img src='https://user-images.githubusercontent.com/21056590/56853086-157f0900-695e-11e9-9122-b95f77136573.png'>

- 프로토타입이므로 한번에 한명씩 2000 토큰을 분배하겠습니다.

<img src='https://user-images.githubusercontent.com/21056590/56853121-87efe900-695e-11e9-9597-10a92ce04022.png'>

- 각 계정별 잔액 변화를 통해 에어드랍이 성공한 것을 확인할 수 있습니다.
- 그럼 이제 계정간 토큰 전송을 진행하겠습니다.
- 전송할 계정에 From 버튼을 수신할 계정에 To 버튼을 눌러보세요.

<img src='https://user-images.githubusercontent.com/21056590/56853151-cc7b8480-695e-11e9-8776-d8e6b40d5c38.png'>

- Kevin -> Tiffany : 1000 Token 전송을 가정 해보겠습니다.
- 발신인과 수신인을 선택하면 ID 바에서 선택 여부를 확인할 수 있는 아이콘이 표기 됩니다.
- 발신인의 토큰만 입력할 수 있도록 발신인 Amount 메뉴만 활성화 됩니다.
- 상단의 송금하기 버튼도 활성화가 된 것을 볼 수 있습니다.
- 만약 선택을 취소하고 싶다면, 새로고침 버튼을 누르세요.
- 브라우저 캐시에 스마트 컨트랙트 주소를 담고 있으므로 프로토타입에서는 브라우저 새로고침은 권장하지 않습니다.

<img src='https://user-images.githubusercontent.com/21056590/56853321-ecac4300-6960-11e9-82ae-406cc9d24e54.png'>

- 몇회의 트랜잭션을 실행하고 유저간 토큰 전송이 원활히 되는 지를 확인하시면 됩니다.
- 추가된 유저와 새로운 컨트랙트를 테스트하고 싶을 때는 배포 페이지로 이동해서 아까와 동일한 프로세스를 진행하고 CA 를 취득하면 됩니다.
- 배포된 CA 는 PostgreSQL 의 Contract 테이블을 참고하면 됩니다.

<img src='https://user-images.githubusercontent.com/21056590/56853363-98ee2980-6961-11e9-9c5a-dffe7d78819e.png'>

- 새로고침 왼편에 컨트랙트 등록 버튼이 있습니다.
- CA 를 붙여넣고 옆에 버튼을 누르면 브라우저 기본 컨트랙트로 변경이 됩니다.
- 등록 후 새로고침을 누르면 스마트 컨트랙트별 잔고를 조회할 수 있습니다.

4. 거래내역 확인

- 이제 헤더의 거래내역 버튼을 눌러 페이지를 이동합니다.

<img src='https://user-images.githubusercontent.com/21056590/56938340-4b79e400-6b3c-11e9-9f85-64ddf5988911.png' />

- EVM, 미들웨어에서 거래가 모두 정상처리 되었다면 전체 거래내역을 조회할 수 있습니다.
- 전체 거래내역은 미들웨어 저장하고 관리하는 PostgreSQL 거래 이력을 출력합니다.
- EVM 노드와 모든 내용이 거의 동일하지만, 거래 흐름을 이해하기 편하도록, To 를 수신자의 지갑주소로 표시 합니다.
- 그럼 실제 EVM 노드에 기록된 블록을 살펴 보겠습니다.

<img src='https://user-images.githubusercontent.com/21056590/56938428-dd81ec80-6b3c-11e9-8f8b-7f492812a330.png' />

- 상단의 검색바에서 Tx Hash 값을 입력하여 나타타는 창을 클릭허거나 트랜잭션 박스에 있는 상세보기를 클릭하여 이동합니다.

<img src='https://user-images.githubusercontent.com/21056590/56938588-c1327f80-6b3d-11e9-97c6-9685b1c0606d.png' />

- 실제 EVM을 통해 기록된 블록을 살펴보면, To 의 주소가 다른 것을 알 수 있습니다.
- 실제 블록의 To 데이터는 미들웨어에서 관리하는 CA 주소와 일치합니다.
- 사용자가 보내는 토큰은 스마트 컨트랙트를 수신자로 하여서 트랜잭션 처리합니다.
- 이렇게되면 실 거래이력 파악하는데 번거로워지므로, 미들웨어에서 실제 소유자의 지갑 주소를 매핑해서 관리/저장하게 됩니다.

---
