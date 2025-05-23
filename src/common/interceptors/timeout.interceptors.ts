import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { Observable, throwError, TimeoutError } from "rxjs";
import { catchError, timeout } from "rxjs/operators";


@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const timeoutValue = 30000;
        return next.handle().pipe(
            timeout(timeoutValue),
            catchError(err => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException('La solicitud ha excedido el tiempo maximo de espera'));
                }
                return throwError(() => err as Error);
            }),
        )
    }
}