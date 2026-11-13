export class HashMap {
    constructor (loadFactor = 0.75,capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.size = 0;
        this.buckets = Array.from({length:capacity}, () => []);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    getBucket(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error ("Trying to access index out of bounds");
        }
        return this.buckets[index];
    }

    set(key,value) {
        const bucket =  this.getBucket(this.hash(key));

        for (const entry of bucket) {
            if (entry [0] === key) {
                entry[1] = value;
                return;
            }
        }

        bucket.push([key,value]);
        this.size++;
    }
}

