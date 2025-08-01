/**
 * JWT 인증이 필요 없는 퍼블릭 엔드포인트 데코레이터
 */
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);
