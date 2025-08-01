/**
 * 헬스체크 컨트롤러
 * - 서비스 상태 확인용 엔드포인트
 */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiSecurity } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
@ApiSecurity('apiKeyAuth')
export class HealthController {
	/**
	 * 서비스 상태 확인 (Health Check)
	 * @returns 서버 상태 정보
	 */
	@Public()
	@Get()
	@ApiOperation({
		summary: '서비스 상태 확인',
		description: 'API 서버의 상태를 확인합니다.'
	})
	@ApiResponse({
		status: 200,
		description: '서비스 정상',
		schema: {
			type: 'object',
			properties: {
				status: { type: 'string', example: 'ok' },
				message: { type: 'string', example: 'API 서버 정상 작동 중입니다.' },
				timestamp: { type: 'string', example: '2025-08-01T14:00:00.000Z' },
				version: { type: 'string', example: '1.0.0' },
				uptime: { type: 'number', example: 3600.5 }
			}
		}
	})
	async check() {
		return {
			status: 'ok',
			message: 'API 서버 정상 작동 중입니다.',
			timestamp: new Date().toISOString(),
			version: '1.0.0',
			uptime: process.uptime(),
			service: 'api',
			endpoints: {
				health: '/health'
			}
		};
	}
}
