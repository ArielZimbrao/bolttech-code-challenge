import crypto from 'crypto-js'

export default class CryptoHandler {
    static encrypt(text) {
        return crypto.AES.encrypt(text, '12f11b0e899fe3a87cff6503238f62eb42892aae12661a98bdf62abba6bb4dff').toString();
    }
}