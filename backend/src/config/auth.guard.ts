import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { cryptoUtils } from 'src/util/crypto.utils';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization
    
    if (!token || !token.startsWith("Bearer")) {
      return false
    }

    try {
      const tokenDecrypto = cryptoUtils.decryptoAccessToken(token)

      const nowDate = new Date().getTime()

      if (tokenDecrypto.expirationDate < nowDate) {
        return false
      }

      request.user = {
        email: tokenDecrypto.email,
        id: tokenDecrypto.userId
      }
      return true;
    } catch(error) {
      return false
    }
    
  }
}
