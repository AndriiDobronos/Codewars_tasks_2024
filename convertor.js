const Alphabet = {
    BINARY:        '01',
    OCTAL:         '01234567',
    DECIMAL:       '0123456789',
    HEXA_DECIMAL:  '0123456789abcdef',
    ALPHA_LOWER:   'abcdefghijklmnopqrstuvwxyz',
    ALPHA_UPPER:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ALPHA:         'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ALPHA_NUMERIC: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
};
function convert(input,source,target) {
    let result ='';

    function decimalToBase(baseString,radix) {
        const baseLength = baseString.length;
        let result = '';
        while (radix > 0) {
            const remainder = radix % baseLength;
            result = baseString[remainder] + result;
            radix = Math.floor(radix / baseLength);
        }
        return result ? result : baseString[0];
    }

    function baseToDecimal(baseString,radix) {
        let result = 0;
        let radixLength = 0
        const baseLength = baseString.length
        while (radixLength < radix.length) {
            baseString.split('').forEach((el,index)=> {
                if(el === radix[radixLength]) {
                    result = result*baseLength + index
                }
            })
            radixLength = radixLength + 1
        }
        return result ? result : baseString[0];
    }

    if(source !== Alphabet.DECIMAL && target === Alphabet.DECIMAL) {
        result = baseToDecimal(source,input)
    }
    if(source === Alphabet.DECIMAL && target !== Alphabet.DECIMAL) {
        result = decimalToBase(target,input)
    }
    if(source === target) {
        result =  input
    }
    else {
        result = decimalToBase(target,baseToDecimal(source,input))
    }

    return result
}

let decimalOfString = 'ff'.split('').reduce((acc,cur,index)=>acc * '0123456789abcdef'.length + '0123456789abcdef'.indexOf(cur), 0)
console.log(decimalOfString)

console.log(convert("15",Alphabet.DECIMAL,Alphabet.BINARY))
console.log(convert("15",Alphabet.DECIMAL,Alphabet.OCTAL))
console.log(convert("1010",Alphabet.BINARY,Alphabet.DECIMAL))
console.log(convert("1010",Alphabet.BINARY,Alphabet.HEXA_DECIMAL))
console.log(convert("0",Alphabet.DECIMAL,Alphabet.ALPHA))
console.log(convert("27",Alphabet.DECIMAL,Alphabet.ALPHA_LOWER))
console.log(convert("hello",Alphabet.ALPHA_LOWER,Alphabet.HEXA_DECIMAL))
console.log(convert("SAME",Alphabet.ALPHA_UPPER,Alphabet.ALPHA_UPPER))