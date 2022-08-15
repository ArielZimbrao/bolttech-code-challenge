import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';
var ncrypt = require("ncrypt-js");
import * as dotenv from 'dotenv';
dotenv.config();

export class cryptoUtils {
  public static decryptoPassword(password: string) {
    return CryptoJS.AES.decrypt(
      password,
      process.env.APP_KEY_CRYPTO_FRONT,
    ).toString(CryptoJS.enc.Utf8);
  }

  public static encrypt(text: string) {
    return CryptoJS.AES.encrypt(
      text,
      process.env.APP_KEY_CRYPTO_FRONT,
    ).toString();
  }

  public static async compare(
    password: string,
    hash: string,
  ): Promise<boolean> {
    const passwordDecrypto = this.decryptoPassword(password);
    return bcrypt.compare(passwordDecrypto, hash);
  }

  public static hash(text: string): Promise<string> {
    return bcrypt.hash(text, 10);
  }

  public static preSavePassword(password: string) {
    const passwordDecrypto = this.decryptoPassword(password);
    return this.hash(passwordDecrypto);
  }

  public static getAccessToken(userId: number, email: string, password: string, expirationTime: number): string {
    const ncryptObject = new ncrypt(process.env.APP_KEY_CRYPTO_ACCESS_TOKEN);
    const initialDate = new Date().getTime()
    const finalDate = initialDate + expirationTime
    const data = {
      createdDate: initialDate,
      userId: userId,
      email: email,
      password: password,
      expirationDate: finalDate,
    }
    const strData = JSON.stringify(data);
    return ncryptObject.encrypt(strData)
  }

  public static decryptoAccessToken(accessToken: string) {
    try {
      const ncryptObject = new ncrypt(process.env.APP_KEY_CRYPTO_ACCESS_TOKEN);
      const token = accessToken.split(' ')[1]
      const decryptToken = ncryptObject.decrypt(token)

      return JSON.parse(decryptToken);
    } catch (error) {
      console.error(error)
      throw new Error()
    }
  }
}
