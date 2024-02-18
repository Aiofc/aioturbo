import crypto from 'crypto';

// 加密函数（使用A256GCM算法）
export function encryptA256GCM(data: string): string {
    const key = process.env.NEXT_PUBLIC_KEY_SECRET as string
    const iv = process.env.NEXT_PUBLIC_IV_SECRET as string
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${encrypted.toString('hex')}.${tag.toString('hex')}`;
}

// 解密函数（使用A256GCM算法）
export function decryptA256GCM(encryptedData: string | undefined): string {
    if (!encryptedData) return '';
    const key = process.env.NEXT_PUBLIC_KEY_SECRET as string
    const iv = process.env.NEXT_PUBLIC_IV_SECRET as string
    const [encrypted, tag] = encryptedData.split('.');
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);
    return decrypted.toString('utf8');
}
