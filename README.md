# Face API 서비스

## 📜 개요

본 프로젝트는 NestJS 프레임워크를 기반으로 구축된 백엔드 API 서비스입니다. 사용자 인증, API 요청 제한, 상태 확인 등과 같은 핵심 백엔드 기능을 제공하며, 개발 및 프로덕션 환경에 대한 설정이 분리되어 있습니다.

Swagger를 통해 API 문서를 자동으로 생성하여 개발 편의성을 높였으며, GitHub Actions를 이용한 자동 배포 파이프라인이 구축되어 있습니다.

## ✨ 주요 기능

- **NestJS 기반**: 확장 가능하고 효율적인 서버사이드 애플리케이션을 위한 프레임워크 사용.
- **인증 시스템**: JWT (JSON Web Token) 및 API 키를 사용한 이중 인증 체계.
- **요청 제한 (Rate Limiting)**: `Throttler`를 사용하여 특정 시간 동안의 API 요청 횟수를 제한하여 서비스 안정성 확보.
- **환경 변수 관리**: `ConfigModule`을 통해 `.env` 파일에 정의된 환경 변수를 안전하게 관리.
- **자동 API 문서화**: 개발 환경에서 `Swagger`를 통해 API 엔드포인트를 자동으로 문서화하고 테스트 UI 제공.
- **헬스 체크**: `GET /health` 엔드포인트를 통해 서비스의 현재 상태를 실시간으로 확인.
- **CORS 설정**: 특정 도메인에서의 요청만 허용하도록 CORS (Cross-Origin Resource Sharing) 정책 설정.
- **자동 배포**: GitHub Actions를 통해 `sample` 브랜치에 푸시 시 지정된 서버에 자동으로 빌드 및 배포.

## 🛠️ 기술 스택

- **Backend**: NestJS, TypeScript
- **Authentication**: Passport, JWT (JSON Web Token)
- **API Documentation**: Swagger
- **Package Manager**: pnpm
- **Process Manager**: pm2
- **CI/CD**: GitHub Actions

## ⚙️ 환경 변수 설정

프로젝트 루트 디렉터리에 환경에 맞는 `.env` 파일을 생성해야 합니다.

- 개발용: `.env.development`
- 프로덕션용: `.env.production`

```env
# 서버 설정
NODE_ENV=development
PORT=3000

# CORS 설정 (쉼표로 여러 도메인 구분)
# 예: http://localhost:3001,https://your-frontend.com
ALLOWED_ORIGINS=

# 인증 정보
API_KEY=your_secret_api_key
JWT_SECRET=your_jwt_secret_key

# SSH 배포 정보 (GitHub Actions에서 사용)
SSH_HOST=
SSH_PORT=
SSH_USERNAME=
SSH_PRIVATE_KEY=
```

## 🚀 로컬 환경 설정 및 실행

### 1. 사전 요구사항

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)

### 2. 설치

```bash
# 프로젝트 저장소를 클론합니다.
git clone <repository-url>
cd face-api

# pnpm을 사용하여 의존성을 설치합니다.
pnpm install
```

### 3. 애플리케이션 실행

#### 개발 모드

파일 변경 시 자동으로 서버가 재시작됩니다. Swagger API 문서가 활성화됩니다.

```bash
# 개발 모드로 서버 실행
pnpm start:dev
```

- 서버 주소: `http://localhost:3000`
- API 문서 (Swagger): `http://localhost:3000/api-docs`

#### 프로덕션 모드

```bash
# 애플리케이션 빌드
pnpm build

# 프로덕션 모드로 서버 실행
pnpm start:prod
```

## 📖 API 엔드포인트

자세한 API 명세는 개발 서버 실행 후 [Swagger 문서](http://localhost:3000/api-docs)에서 확인하실 수 있습니다.

### 헬스 체크 (Health Check)

- **Endpoint**: `GET /health`
- **설명**: API 서버의 현재 상태, 버전, 가동 시간 등의 정보를 반환합니다.
- **인증**: 필요 없음 (`@Public` 데코레이터 적용)
- **성공 응답 (200 OK)**:
  ```json
  {
    "status": "ok",
    "message": "API 서버 정상 작동 중입니다.",
    "timestamp": "2025-08-20T10:00:00.000Z",
    "version": "1.0.0",
    "uptime": 123.45
  }
  ```

## 🔄 배포

본 프로젝트는 GitHub Actions를 통해 `sample` 브랜치에 코드가 푸시되면 자동으로 배포가 진행됩니다.

- **트리거**: `sample` 브랜치에 `push` 이벤트 발생 시
- **프로세스**:
  1. Ubuntu 서버에 SSH로 접속합니다.
  2. `nvm`을 사용하여 Node.js 버전을 맞춥니다.
  3. `pnpm install`로 의존성을 설치합니다.
  4. `pnpm build`로 프로젝트를 빌드합니다.
  5. `pm2`를 사용하여 기존 프로세스를 리로드하거나 새로 시작합니다.

배포를 위해서는 GitHub 저장소의 `Secrets`에 `SSH_HOST`, `SSH_PORT`, `SSH_USERNAME`, `SSH_PRIVATE_KEY`가 등록되어 있어야 합니다.

## 📁 프로젝트 구조

```
.
├── .github/workflows/   # GitHub Actions 워크플로우
│   └── deploy.yml
├── dist/                # 빌드 결과물이 저장되는 디렉터리
├── src/                 # 소스 코드
│   ├── common/          # 공통 모듈 (가드, 데코레이터 등)
│   │   ├── controllers/
│   │   ├── decorators/
│   │   └── guards/
│   ├── config/          # 환경 설정 모듈
│   ├── app.module.ts    # 루트 모듈
│   └── main.ts          # 애플리케이션 진입점
├── .env.development     # 개발 환경 변수 파일
├── .env.production      # 프로덕션 환경 변수 파일
├── package.json         # 의존성 및 스크립트 정의
├── tsconfig.json        # TypeScript 설정
└── README.md            # 프로젝트 안내 문서
```
