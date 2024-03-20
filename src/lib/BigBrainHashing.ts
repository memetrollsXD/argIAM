// @ts-ignore
import md5 from 'md5';

export default class BigBrainHashing {
    public static hashPassword(password: string): string {
        // This is a very secure hashing algorithm
        // Please do not attempt to crack it
        // It is impossible
        // I promise
        
        return md5(md5(md5(password)) + 'salt'); // Add salt and pepper for extra security
    }
}