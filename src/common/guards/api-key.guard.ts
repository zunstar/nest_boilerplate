import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';

/**
 * 도메인별 API Key 인증 Guard
 * - x-api-key 헤더와 origin 헤더를 매칭하여 인증
 * - 환경변수에서 도메인별 키를 관리 (예: API_KEY_LOCAL, API_KEY_PROD 등)
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly allowedOrigins: string[] = (process.env.ALLOWED_ORIGINS || '').split(',').map(origin => origin.trim()).filter(origin => origin.length > 0);

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const origin = request.headers['origin'] || request.headers['referer'];
		const apiKey = request.headers['x-api-key'];

	if (!origin) {
	  console.log('[API Key Guard] origin 헤더 없음');
	  throw new ForbiddenException('요청 출처(origin)를 알 수 없습니다.');
	}

	if (!this.allowedOrigins.includes(origin)) {
	  console.log('[API Key Guard] 허용되지 않은 도메인:', origin);
	  console.log('[API Key Guard] allowedOrigins:', this.allowedOrigins);
	  throw new ForbiddenException(`허용되지 않은 도메인입니다: ${origin}`);
	}

	const expectedKey = process.env.API_KEY;
	if (!apiKey || apiKey !== expectedKey) {
	  console.log('[API Key Guard] 인증 실패');
	  console.log('origin:', origin);
	  console.log('allowedOrigins:', this.allowedOrigins);
	  console.log('apiKey:', apiKey, 'expectedKey:', expectedKey);
	  throw new UnauthorizedException('잘못된 API Key입니다.');
	}

		return true;
	}
}