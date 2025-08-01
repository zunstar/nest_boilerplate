
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// 환경 변수 안전하게 가져오기
function getEnv(key: string, fallback?: string) {
  return process.env[key] || fallback || '';
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const NODE_ENV = getEnv('NODE_ENV', 'development');
  const isDev = NODE_ENV === 'development';

  // CORS 도메인 환경변수에서 가져오기
  let corsOrigins : string[] = [];
  const allowedOriginsEnv = getEnv('ALLOWED_ORIGINS');
  if (!allowedOriginsEnv) {
    console.warn('[CORS] ALLOWED_ORIGINS 환경변수가 비어 있습니다. CORS가 제한됩니다.');
    corsOrigins = [];
  } else {
    corsOrigins = allowedOriginsEnv.split(',').map(origin => origin.trim()).filter(origin => origin.length > 0);
  }

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-api-key'],
    credentials: true,
  });

  // Swagger 문서 (개발에서만)
  if (isDev) {
    const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription(' 분석 서비스 API')
      .setVersion('1.0')
      .addBearerAuth()
      .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'apiKeyAuth')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  const PORT = getEnv('PORT', '3000');
  await app.listen(PORT);

  console.log(`🚀 Server running on http://localhost:${PORT}`);
  if (isDev) {
    console.log(`📚 API Docs available at http://localhost:${PORT}/api-docs`);
    console.log(`🌐 CORS enabled for: ${corsOrigins.join(', ')}`);
  } else {
    console.log(`🌐 CORS enabled for: ${corsOrigins.join(', ')}`);
  }
}
bootstrap();
