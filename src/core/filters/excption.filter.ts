import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      let message = exception.getResponse();

      // Handle UNAUTHENTICATED (401)
      if (exception instanceof UnauthorizedException) {
        status = HttpStatus.UNAUTHORIZED;
        message = 'UNAUTHENTICATED: You must be logged in.';
        return new GraphQLError(message, {
          extensions: { code: 'UNAUTHENTICATED', status },
        });
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle Prisma-specific errors
      status = HttpStatus.BAD_REQUEST;
      message = this.handlePrismaError(exception);
    }

    const errorResponse = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request?.url || 'GraphQL',
    };

    // GraphQL responses don't use res.status(), so throw GraphQLError
    if (!request) {
      throw new GraphQLError(message, {
        extensions: { code: 'INTERNAL_SERVER_ERROR', status },
      });
    }

    ctx.getResponse().status(status).json(errorResponse);
  }

  private handlePrismaError(exception: Prisma.PrismaClientKnownRequestError): string {
    switch (exception.code) {
      case 'P2002':
        return 'Unique constraint failed. Duplicate value exists.';
      case 'P2025':
        return 'Record not found.';
      default:
        return 'Database error occurred.';
    }
  }
}
