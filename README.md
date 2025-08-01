---

## GitHub Actions 서비스명(SERVICE_NAME) 관리 설명

배포 워크플로에서 `SERVICE_NAME` 환경 변수는 다음 용도로 사용됩니다:

- **PM2 프로세스명**: pm2로 관리되는 Node.js 서비스의 이름으로 사용
- **서버 폴더 경로**: SSH 배포 시 해당 서비스가 위치한 서버의 폴더 경로(`~/SERVICE_NAME`)로 활용

즉, `SERVICE_NAME`을 변경하면 서버의 폴더명과 pm2 프로세스명이 모두 일관되게 적용되어 여러 프로젝트/환경에 쉽게 확장할 수 있습니다.

> 예시: `SERVICE_NAME: face_api`라면, 서버의 경로는 `~/face_api`이고, pm2 프로세스명도 `face_api`로 관리됩니다.
## 프로젝트 개요

NestJS 기반 API 서버로, 인증/보안/헬스체크/Swagger 문서화 등 실무에 필요한 기본 아키텍처를 제공합니다.

---

## 아키텍처 설명

- **NestJS 모듈 구조**: `src/app.module.ts`에서 루트 모듈을 정의하며, 환경설정(`ConfigModule`), 요청 제한(`ThrottlerModule`), 인증(`ApiKeyGuard`, `JwtAuthGuard`), 헬스체크(`HealthController`) 등 핵심 기능을 모듈화.
- **환경 변수 관리**: `.env.development`, `.env.production` 파일과 `src/config` 모듈에서 환경별 설정을 안전하게 로딩.
- **API 인증**: `x-api-key` 헤더와 Origin 기반 인증(`ApiKeyGuard`), JWT 인증(`JwtAuthGuard`)을 지원.
- **Swagger 문서화**: 개발 환경에서 자동 API 문서 제공.
- **Throttler**: 기본/AI 요청 제한 정책 적용.

---

## 주요 Spec

- **언어/프레임워크**: TypeScript, NestJS
- **런타임**: Node.js 18+ (권장)
- **API 인증**: API Key + JWT
- **CORS**: 환경변수 기반 허용 Origin 관리
- **문서화**: Swagger UI (`/api-docs`)
- **헬스체크**: `/health` 엔드포인트

---

## 환경 변수(.env.development) 설명

| 변수명              | 설명                                                         | 예시 값                                      |
|---------------------|-------------------------------------------------------------|----------------------------------------------|
| ALLOWED_ORIGINS     | 허용된 CORS Origin 목록(쉼표로 구분)                         | http://localhost:3000,http://127.0.0.1:3000  |
| PORT                | 서버 실행 포트                                               | 3000                                         |
| NODE_ENV            | 실행 환경(개발/운영 등)                                      | development                                  |
| API_KEY             | API 인증용 키(헤더 x-api-key로 전달, ApiKeyGuard에서 검증)   | dev-key                                      |
| JWT_SECRET          | JWT 토큰 서명에 사용되는 비밀키                              | dev-secret                                   |
| JWT_EXPIRES_IN      | JWT 토큰 만료 시간                                           | 1h                                           |

> 모든 환경 변수는 `src/config` 모듈에서 안전하게 로딩되며, 인증 및 보안 관련 값은 절대 코드에 하드코딩하지 않습니다.

---

## 인증 및 보안

- API 요청 시 반드시 `x-api-key` 헤더에 `API_KEY` 값을 포함해야 하며, Origin은 `ALLOWED_ORIGINS`에 등록된 값이어야 합니다.
- JWT 기반 인증은 `JWT_SECRET`과 `JWT_EXPIRES_IN` 값을 활용하여 구현됩니다.
- 인증 로직은 `src/common/guards/api-key.guard.ts`, `src/common/guards/jwt-auth.guard.ts` 참고.

---

## 설치 및 실행 순서

1. **의존성 설치**
   ```bash
   pnpm install
   # 또는 npm install
   ```
2. **환경 변수 파일 작성**
   - `.env.development` 파일을 프로젝트 루트에 생성 후, 예시 값 참고하여 작성
3. **개발 서버 실행**
   ```bash
   pnpm start:dev
   # 또는 npm run start:dev
   ```
4. **Swagger 문서 확인**
   - [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 폴더 구조

```
src/
  app.module.ts         # 루트 모듈
  main.ts               # 앱 부트스트랩 및 환경설정
  common/
    controllers/        # 헬스체크 등 공통 컨트롤러
    decorators/         # 인증/퍼블릭 데코레이터
    filters/            # 예외 처리 필터
    guards/             # 인증/보안 Guard
    interceptors/       # 인터셉터
    utils/              # 유틸리티
  config/               # 환경설정 모듈 및 환경별 설정
  modules/              # 도메인별 비즈니스 모듈
```

---

## 참고

- 인증 방식 및 환경 변수 활용 예시는 `src/common/guards/api-key.guard.ts`, `src/main.ts` 참고
- 헬스체크 엔드포인트: `/health` (JWT/ApiKey 인증 없이 접근 가능)

---

jobs:
## GitHub Actions 서비스명(SERVICE_NAME) 관리 설명

배포 워크플로에서 `SERVICE_NAME` 환경 변수는 다음 용도로 사용됩니다:

- **서버 폴더 경로**: SSH 배포 시 해당 서비스가 위치한 서버의 폴더 경로(`~/SERVICE_NAME`)로 활용
- **PM2 프로세스명**: pm2로 관리되는 Node.js 서비스의 이름으로 사용

즉, `SERVICE_NAME`을 변경하면 서버의 폴더명과 pm2 프로세스명이 모두 일관되게 적용되어 여러 프로젝트/환경에 쉽게 확장할 수 있습니다.

> 예시: `SERVICE_NAME: face_api`라면, 서버의 경로는 `~/face_api`이고, pm2 프로세스명도 `face_api`로 관리됩니다.
