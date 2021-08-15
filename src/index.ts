import * as CryptoJS from "crypto-js";
class Block {
    static calculateBlockHash = (
        index:number, 
        previousHash:string, 
        timestamp:number,
        data: string):string => 
        CryptoJS.SHA256(index+previousHash+timestamp+data).toString();

    static validateStructure = (aBlock:Block):boolean => 
    typeof aBlock.index === "number" 
    && typeof aBlock.hash ==="string"
    && typeof aBlock.previousHash === "string"
    && typeof aBlock.timestamp === "number"
    && typeof aBlock.data === "string";


    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    
    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number,
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data; 
        this.timestamp = timestamp;
    }   
}



const genesisBlock:Block = new Block(0, "014983987537", "", "hello", 123456);
let blockchain: [Block] = [genesisBlock];

// const getBlockchain = () :Block[] => blockchain;

const getLatestBlock = () : Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime()/1000);

const createNewBlock = (data:string) : Block =>{
    const previousBlock : Block = getLatestBlock();
    const newIndex : number = previousBlock.index + 1;
    const newTimestamp : number = getNewTimeStamp();
    const newHash : string = Block.calculateBlockHash(
        newIndex, 
        previousBlock.hash,
        newTimestamp,
        data
    );
    const newBlock : Block = new Block(
        newIndex, 
        newHash,
        previousBlock.hash,
        data,
        newTimestamp,
    );
    addBlock(newBlock);
    return newBlock;
}


// console.log(createNewBlock("hello"), createNewBlock("hello2"));
const getHashforBlock = (aBlock: Block) :string => Block.calculateBlockHash(
    aBlock.index, 
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data);

const isBlockValid = (candidataBlock:Block, previousBlock: Block):boolean=>{
    if(!Block.validateStructure(candidataBlock)){
        return false;
    }else if(previousBlock.index +1 !== candidataBlock.index){
        return false;
    }else if(previousBlock.hash !== candidataBlock.previousHash){
        return false;
    }else if(getHashforBlock(candidataBlock)!== candidataBlock.hash){
        return false
    }else{
        return true;
    }
}

const addBlock = (candidateBlock:Block):void => {
    if(isBlockValid(candidateBlock,getLatestBlock())){
        blockchain.push(candidateBlock);
    }
}

createNewBlock("1 block");
createNewBlock("2 block");
console.log(blockchain);
createNewBlock("3 block");
console.log(blockchain);


export {};