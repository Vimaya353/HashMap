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

    get(key) {
        const bucket = this.getBucket(this.hash(key));
        for (const entry of bucket) {
            if (entry[0] === key) return entry[1];
        }
        return undefined;
    }

    has(key)  {
        const bucket = this.getBucket(this.hash(key));
        return bucket.some((entry) => entry[0] === key);
    }

    remove(key){
        const bucket = this.getBucket(this.hash(key));

        for(let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key ){
                bucket.splice(i,1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear(){
        this.buckets = Array.from({length:this.capacity}, () => []);
        this.size = 0;
    }

    entries() {
        const result = [];
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                result.push([entry[0],entry[1]]);
            }
        }
        return result;
    }

    keys() {
        return this.entries().map(([key]) => key);
    }

    values() {
        return this.entries().map(([,value]) => value);
    }

    grow() {
        const oldEntries = this.entries();

        this.capacity *= 2;
        this.buckets = Array.from({length:this.capacity}, () => []);
        this.size = 0;

        if (this.size > this.capacity * this.loadFactor) {
            this.grow();
        }

        for(const[key,value] of oldEntries) {
            this.set(key,value);
        }
    }

}

